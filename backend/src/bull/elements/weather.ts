import { number } from "zod";
import { WeatherElement } from "../../models/newsletterElementTypes";


const fs = require('node:fs');


const getWeatherIcon = (weatherType: string): string => {
    return `<img height="100" width="100" src='https://raw.githubusercontent.com/metno/weathericons/refs/heads/main/weather/png/${weatherType}.png'>`
    //return fs.readFileSync(`icons/svg/${weatherType}.svg`)
}


function createWeatherHtml(location: string, forecastDuration: string, weatherData: weatherData[] ): string {
    let baseHtmlOutput = 
    `<div class="fw"><div class="bg-lightblue">${forecastDuration} report for ${location}</div><div  class="flex">`
    for (let i = 0; i<weatherData.length; i += 2) {
        baseHtmlOutput += `<div class="p-10">` + 
        `<h3>${weatherData[i].time.split('-')[2].split('T')[0]}</h3>`;
        
        baseHtmlOutput += getWeatherIcon(weatherData[i+1].data.next_6_hours.summary.symbol_code)

        baseHtmlOutput +=`<p>Day: ${weatherData[i+1].data.instant.details.air_temperature} C</p>` + 
        `<p>Night: ${weatherData[i].data.instant.details.air_temperature} C</p>` + 
        `</div>`
    }
    baseHtmlOutput += `</div></div>`
    return baseHtmlOutput
}

interface weatherData { 
    time: string,
    data: {
        instant: {
            details: {
                "air_pressure_at_sea_level": number,
                "air_temperature": number,
                "cloud_area_fraction": number,
                "relative_humidity": number,
                "wind_from_direction": number,
                "wind_speed": number
            }
        }
        next_6_hours: {
            summary: {
                symbol_code: "partlycloudy_day" | "fair_day" | "rainshowers_day"
            }
        }
    },
}


export async function getWeather({location, forecastDuration} : WeatherElement["settings"]): Promise<string | undefined> {
    const response = await fetch(
        'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=59.4370&lon=24.7536', {
            headers: {'accept': 'application/json', "user-agent": "Newsletter application"}
        }
    )
    const json = await response.json();
    console.log(json, response.status)
    const weather = []
    const date = new Date()

    let year = date.getFullYear()
    let month = date.getMonth() + 1
    //console.log(month)
    const startFromDay = date.getDate() + 1
    console.log(startFromDay)
    const daysInMonth = new Date(year, month, 0).getDate();
    let count = 0
    let j: number = startFromDay;
    for (let i = 0; i<json.properties.timeseries.length; i+=1) {

        if (forecastDuration === "4 days" && weather.length >= 8) {
            break
        }
        else if (forecastDuration === "Tomorrow" && weather.length >= 2){
            break
        }
        else if (forecastDuration === "Week" && weather.length >= 14) {
            break
        }
            
        const data = json.properties.timeseries[i]
        const day = (j % daysInMonth).toString().padStart(2, '0')
        //console.log(daysInMonth, day, parseInt(day, 10))
        if (Math.floor(parseInt(day, 10)/daysInMonth) > 0) {
            month += 1
            if (month > 12) {
                month = 1;
                year += 1
            }
        }
        const monthString = month.toString().padStart(2, '0')
        if (data.time === `${year}-${monthString}-${day}T00:00:00Z`) {
            weather.push(data)
            count ++
        }
        if (data.time === `${year}-${monthString}-${day}T12:00:00Z`) {
            weather.push(data)
            j += 1
            count ++
        }
        //console.log(day)
            //weather.push()
    }
        //return wea
    return createWeatherHtml(location, forecastDuration, weather)
}