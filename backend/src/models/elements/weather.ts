import { WeatherElement } from "../newsletterElementTypes";


function createWeatherHtml(location: string, forecastDuration: string, weatherData: weatherData[][] ): string {
    let baseHtmlOutput = 
    `<div class="fw"><div class="bg-lightblue">${forecastDuration} report for ${location}</div><div  class="flex">`
    for (let i = 0; i<weatherData.length; i++) {
        console.log(weatherData[i])
        baseHtmlOutput += `<div class="p-10"><h3>${i + 1}</h3><p>${weatherData[i][0].temperatuur_max}-${weatherData[i][1].temperatuur_max}</p></div>`
    }
    baseHtmlOutput += `</div></div>`
    return baseHtmlOutput
}

interface weatherData { 
    temperatuur_max: string,
    kp: string,
    ikoon: string,
    temperatuur_min: string,
    osa: 'day' | 'night',
    sisu: string
}


export async function getWeather({location, forecastDuration} : WeatherElement["settings"]): Promise<string | undefined> {
    const response = await fetch(
        'https://publicapi.envir.ee/v1/forecasts/4DayForecast?forecastGroup=9&lang=eng', {
            headers: {'accept': 'application/json'}
        }
    )
    const json = await response.json();
    //console.log(json, response.status)
    const weather = []
    if (forecastDuration === "3 days") {
        var iterStart
        if (json.entries.entry.length === 8) {
            iterStart = 0 
        }
        else {
            iterStart = 1
        }
        for (let i = iterStart; i<json.entries.entry.length; i+=2) {
            weather.push([json.entries.entry[i], json.entries.entry[i+1]])
        }
        return createWeatherHtml(location, forecastDuration, weather)
    }
}