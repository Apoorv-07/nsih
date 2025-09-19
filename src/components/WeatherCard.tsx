import { useState } from "react";
import { Cloud, Thermometer, Droplet, Wind, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const WeatherCard = () => {
  const [city, setCity] = useState("Delhi");
  const [loading, setLoading] = useState(false);
  
  // Mock weather data - replace with real API when backend is connected
  const weatherData = {
    city: "Delhi",
    temperature: 28,
    feels_like: 32,
    humidity: 65,
    weather: "partly cloudy",
    wind_speed: 12,
  };

  const handleWeatherSearch = async () => {
    setLoading(true);
    // Mock API call delay
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5 text-sky" />
            Weather Monitor
          </CardTitle>
          <CardDescription>
            Current weather conditions for your farm location
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleWeatherSearch}
              disabled={loading}
              className="bg-gradient-primary"
            >
              {loading ? "Loading..." : "Get Weather"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            {weatherData.city}
            <Badge variant="secondary" className="ml-auto capitalize">
              {weatherData.weather}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 p-3 bg-gradient-sky rounded-lg text-sky-foreground">
              <Thermometer className="h-5 w-5" />
              <div>
                <p className="text-sm opacity-90">Temperature</p>
                <p className="text-xl font-bold">{weatherData.temperature}°C</p>
                <p className="text-xs opacity-75">Feels like {weatherData.feels_like}°C</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-gradient-primary rounded-lg text-primary-foreground">
              <Droplet className="h-5 w-5" />
              <div>
                <p className="text-sm opacity-90">Humidity</p>
                <p className="text-xl font-bold">{weatherData.humidity}%</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-gradient-earth rounded-lg text-earth-foreground">
              <Wind className="h-5 w-5" />
              <div>
                <p className="text-sm opacity-90">Wind Speed</p>
                <p className="text-xl font-bold">{weatherData.wind_speed} km/h</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-gradient-success rounded-lg text-success-foreground">
              <Cloud className="h-5 w-5" />
              <div>
                <p className="text-sm opacity-90">Conditions</p>
                <p className="text-lg font-semibold capitalize">{weatherData.weather}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherCard;