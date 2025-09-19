import { useState, useEffect } from "react";
import { Radio, Thermometer, Droplet, Wind, Activity, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const IoTDashboard = () => {
  const [sensorData, setSensorData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchSensorData = async () => {
    setLoading(true);
    
    // Mock IoT data - replace with real API when backend is connected
    setTimeout(() => {
      const mockData = {
        soil_moisture_sensor: `${Math.floor(Math.random() * 60) + 20}%`,
        temperature_sensor: `${Math.floor(Math.random() * 23) + 15}°C`,
        humidity_sensor: `${Math.floor(Math.random() * 60) + 30}%`,
        drone_field_health: ["Healthy", "Needs Attention", "Pest Detected"][Math.floor(Math.random() * 3)],
        ph_level: (Math.random() * 2 + 6).toFixed(1),
        light_intensity: Math.floor(Math.random() * 500) + 300,
        wind_speed: (Math.random() * 15 + 5).toFixed(1),
        battery_levels: {
          sensor_1: Math.floor(Math.random() * 40) + 60,
          sensor_2: Math.floor(Math.random() * 40) + 60,
          sensor_3: Math.floor(Math.random() * 40) + 60,
        }
      };
      
      setSensorData(mockData);
      setLastUpdate(new Date());
      setLoading(false);
    }, 1000);
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 30000);
    return () => clearInterval(interval);
  }, []);

  const getHealthStatus = (status: string) => {
    switch (status) {
      case "Healthy": return { color: "success", icon: "🟢" };
      case "Needs Attention": return { color: "warning", icon: "🟡" };
      case "Pest Detected": return { color: "destructive", icon: "🔴" };
      default: return { color: "secondary", icon: "⚪" };
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 50) return "success";
    if (level > 20) return "warning";
    return "destructive";
  };

  if (!sensorData) {
    return (
      <div className="space-y-6">
        <Card className="shadow-card">
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <Radio className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium">Loading IoT Data...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Radio className="h-5 w-5 text-primary" />
                IoT Sensor Dashboard
              </CardTitle>
              <CardDescription>
                Real-time monitoring of your farm's environmental conditions
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Last updated: {lastUpdate.toLocaleTimeString()}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchSensorData}
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-card animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-sky/10 rounded-full">
                <Droplet className="h-6 w-6 text-sky" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Soil Moisture</p>
                <p className="text-2xl font-bold">{sensorData.soil_moisture_sensor}</p>
                <Progress 
                  value={parseInt(sensorData.soil_moisture_sensor)} 
                  className="mt-2" 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-warning/10 rounded-full">
                <Thermometer className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Temperature</p>
                <p className="text-2xl font-bold">{sensorData.temperature_sensor}</p>
                <Badge variant="outline" className="mt-2">
                  Optimal Range
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Droplet className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Humidity</p>
                <p className="text-2xl font-bold">{sensorData.humidity_sensor}</p>
                <Progress 
                  value={parseInt(sensorData.humidity_sensor)} 
                  className="mt-2" 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-earth/10 rounded-full">
                <Wind className="h-6 w-6 text-earth" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Wind Speed</p>
                <p className="text-2xl font-bold">{sensorData.wind_speed} km/h</p>
                <Badge variant="secondary" className="mt-2">
                  Moderate
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-success" />
              Drone Field Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">
                {getHealthStatus(sensorData.drone_field_health).icon}
              </div>
              <p className="text-xl font-semibold mb-2">{sensorData.drone_field_health}</p>
              <Badge>
                Field Status
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">pH Level</p>
                <p className="text-lg font-bold">{sensorData.ph_level}</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Light Intensity</p>
                <p className="text-lg font-bold">{sensorData.light_intensity} lux</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Sensor Battery Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(sensorData.battery_levels).map(([sensor, level]) => (
              <div key={sensor} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium capitalize">
                    {sensor.replace('_', ' ')}
                  </span>
                  <Badge>
                    {String(level)}%
                  </Badge>
                </div>
                <Progress value={level as number} className="h-2" />
              </div>
            ))}
            
            <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
              <p className="text-sm font-medium text-accent-foreground">
                💡 Tip: Replace batteries when levels drop below 20%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IoTDashboard;