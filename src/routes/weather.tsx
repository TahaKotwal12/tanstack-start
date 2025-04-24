import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { getWeather, type WeatherData } from '../utils/getWeather'

export const Route = createFileRoute('/weather')({
  component: Weather,
})

function Weather() {
  const [location, setLocation] = useState('')
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchWeather = async () => {
    if (!location.trim()) {
      setError('Please enter a location')
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await getWeather({ data: location })
      setWeatherData(data)
    } catch (err) {
      setError('Failed to fetch weather data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Weather Forecast</h1>
      
      <div className="mb-4">
        <label htmlFor="location" className="block mb-2">
          Enter Location:
        </label>
        <div className="flex">
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1 border border-gray-300 p-2 rounded-l"
            placeholder="e.g., New York"
          />
          <button
            onClick={fetchWeather}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? 'Loading...' : 'Get Weather'}
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {weatherData && (
        <div className="border border-gray-200 rounded p-4 bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">{weatherData.location}</h2>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-gray-600">Temperature</p>
              <p className="font-bold">{weatherData.temperature}°C</p>
            </div>
            <div>
              <p className="text-gray-600">Condition</p>
              <p className="font-bold">{weatherData.condition}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: {new Date(weatherData.timestamp).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  )
}
