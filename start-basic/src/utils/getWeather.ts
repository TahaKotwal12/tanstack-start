import { createServerFn } from '@tanstack/react-start'

export type WeatherData = {
  location: string
  temperature: number
  condition: string
  timestamp: string
}


export const getWeather = createServerFn({ method: 'GET' })
  .validator((d: string) => d) // Validate that the input is a string (location name)
  .handler(async ({ data: location }) => {
    console.info(`Fetching weather data for ${location}...`)
    

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const weatherConditions = ['Sunny', 'Cloudy', 'Rainy', 'Snowy', 'Windy']
    const randomCondition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)]
    const randomTemperature = Math.floor(Math.random() * 40) - 5 // Temperature between -5 and 35°C
    
    const weatherData: WeatherData = {
      location,
      temperature: randomTemperature,
      condition: randomCondition,
      timestamp: new Date().toISOString()
    }
    
    return weatherData
  })
