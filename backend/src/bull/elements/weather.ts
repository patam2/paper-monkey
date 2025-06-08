import { WeatherElement } from "../../models/newsletterElementTypes";

interface WeatherDetails {
  air_pressure_at_sea_level: number;
  air_temperature: number;
  cloud_area_fraction: number;
  relative_humidity: number;
  wind_from_direction: number;
  wind_speed: number;
}

interface WeatherData {
  time: string;
  data: {
    instant: {
      details: WeatherDetails;
    };
    next_6_hours: {
      summary: {
        symbol_code: string;
      };
    };
  };
}


interface WeatherResponse {
  properties: {
    timeseries: WeatherData[];
  };
}

const FORECAST_LIMITS = {
  "Tomorrow": 2,
  "4 days": 8,
  "Week": 14,
} as const;

type ForecastDuration = keyof typeof FORECAST_LIMITS;

const getWeatherIcon = (weatherType: string): string => {
  return `<img height="100" width="100" src="https://raw.githubusercontent.com/metno/weathericons/refs/heads/main/weather/png/${weatherType}.png" alt="${weatherType}">`;
};

const createWeatherHtml = (
  location: string,
  forecastDuration: string,
  weatherData: WeatherData[]
): string => {
  let html = `
    <div class="fw">
      <div>
        <h3>${forecastDuration} report for ${location}</h3>
      </div>
      <div class="flex">`;

  // Process weather data in pairs (night and day)
  for (let i = 0; i < weatherData.length; i += 2) {
    const nightData = weatherData[i];
    const dayData = weatherData[i + 1];
    
    if (!nightData || !dayData) continue;

    const date = nightData.time.split('T')[0].split('-')[2];
    const weatherIcon = getWeatherIcon(dayData.data.next_6_hours.summary.symbol_code);
    const dayTemp = dayData.data.instant.details.air_temperature;
    const nightTemp = nightData.data.instant.details.air_temperature;

    html += `
      <div class="p-10">
        <h3>${date}</h3>
        ${weatherIcon}
        <p>Day: ${dayTemp}°</p>
        <p>Night: ${nightTemp}°</p>
      </div>`;
  }

  html += `
      </div>
    </div>`;

  return html;
};

const getTargetDates = (forecastDuration: ForecastDuration): string[] => {
  const dates: string[] = [];
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() + 1); // Start from tomorrow

  const limit = FORECAST_LIMITS[forecastDuration];
  const daysNeeded = Math.ceil(limit / 2); // Each day needs 2 entries (night and day)

  for (let i = 0; i < daysNeeded; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    
    // Add both night (00:00) and day (12:00) times
    dates.push(`${year}-${month}-${day}T00:00:00Z`);
    dates.push(`${year}-${month}-${day}T12:00:00Z`);
  }

  return dates;
};

const filterWeatherData = (
  timeseries: WeatherData[],
  targetDates: string[],
  limit: number
): WeatherData[] => {
  const filteredData: WeatherData[] = [];
  const targetDateSet = new Set(targetDates);

  for (const entry of timeseries) {
    if (targetDateSet.has(entry.time)) {
      filteredData.push(entry);
      
      if (filteredData.length >= limit) {
        break;
      }
    }
  }

  return filteredData;
};

export async function getWeather({
  location,
  forecastDuration
}: WeatherElement["settings"]): Promise<string | undefined> {
  try {
    const response = await fetch(
      'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=59.4370&lon=24.7536',
      {
        headers: {
          'accept': 'application/json',
          'user-agent': 'Newsletter application'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Weather API request failed: ${response.status}`);
    }

    const weatherResponse: WeatherResponse = await response.json();
    
    if (!weatherResponse.properties?.timeseries) {
      throw new Error('Invalid weather data structure');
    }

    const duration = forecastDuration as ForecastDuration;
    const limit = FORECAST_LIMITS[duration];
    
    if (!limit) {
      throw new Error(`Unsupported forecast duration: ${forecastDuration}`);
    }

    const targetDates = getTargetDates(duration);
    const filteredWeatherData = filterWeatherData(
      weatherResponse.properties.timeseries,
      targetDates,
      limit
    );

    if (filteredWeatherData.length === 0) {
      throw new Error('No weather data found for the requested period');
    }

    return createWeatherHtml(location, forecastDuration, filteredWeatherData);
    
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return undefined;
  }
}