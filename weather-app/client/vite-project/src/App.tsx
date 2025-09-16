import React, { useEffect, useState } from "react";

interface WeatherData {
  temperature: number;
  condition: string;
}

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/weather")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-lg">Loading weather...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">Weather App</h1>
      {weather ? (
        <div className="bg-blue-100 p-4 rounded-lg shadow-md">
          <p className="text-xl">
            🌡 Temperature: <span className="font-semibold">{weather.temperature}°C</span>
          </p>
          <p className="text-xl">
            ☁ Condition: <span className="font-semibold">{weather.condition}</span>
          </p>
        </div>
      ) : (
        <p>No weather data available.</p>
      )}
    </div>
  );
}

export default App;
