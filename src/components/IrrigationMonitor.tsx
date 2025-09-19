import { useState } from "react";
import { Droplets, Thermometer, Cloud, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

const IrrigationMonitor = () => {
  const [formData, setFormData] = useState({
    soil_moisture: "",
    crop_type: "",
    weather_forecast: "",
  });
  
  const [advice, setAdvice] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const cropTypes = [
    "Wheat", "Rice", "Corn", "Soybeans", "Cotton", "Tomatoes", 
    "Potatoes", "Carrots", "Lettuce", "Other"
  ];

  const weatherOptions = [
    { value: "sunny", label: "Sunny", icon: "☀️" },
    { value: "cloudy", label: "Cloudy", icon: "☁️" },
    { value: "rain", label: "Rain Expected", icon: "🌧️" },
    { value: "storm", label: "Storm", icon: "⛈️" },
  ];

  const getIrrigationAdvice = async () => {
    if (!formData.soil_moisture || !formData.crop_type || !formData.weather_forecast) {
      return;
    }
    
    setLoading(true);
    
    // Mock irrigation logic - replace with real API when backend is connected
    setTimeout(() => {
      const moisture = parseFloat(formData.soil_moisture);
      let recommendation = "No irrigation needed.";
      let urgency = "low";
      let waterAmount = 0;
      
      if (moisture < 30 && formData.weather_forecast !== "rain") {
        recommendation = `Recommend immediate irrigation for ${formData.crop_type}. Soil moisture is critically low.`;
        urgency = "high";
        waterAmount = 25;
      } else if (moisture < 50 && formData.weather_forecast === "sunny") {
        recommendation = `Consider irrigation for ${formData.crop_type}. Soil moisture is getting low.`;
        urgency = "medium";
        waterAmount = 15;
      } else if (formData.weather_forecast === "rain") {
        recommendation = "Rain expected, postpone irrigation to avoid waterlogging.";
        urgency = "low";
      }
      
      const mockAdvice = {
        crop: formData.crop_type,
        soil_moisture: moisture,
        weather_forecast: formData.weather_forecast,
        advice: recommendation,
        urgency,
        recommended_water_amount: waterAmount,
        optimal_moisture_range: [40, 70],
        next_check: "6 hours"
      };
      
      setAdvice(mockAdvice);
      setLoading(false);
    }, 1000);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "destructive";
      case "medium": return "warning";
      case "low": return "success";
      default: return "secondary";
    }
  };

  const getMoistureStatus = (moisture: number) => {
    if (moisture < 30) return { status: "Critical", color: "destructive" };
    if (moisture < 50) return { status: "Low", color: "warning" };
    if (moisture > 80) return { status: "High", color: "sky" };
    return { status: "Optimal", color: "success" };
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-sky" />
            Smart Irrigation System
          </CardTitle>
          <CardDescription>
            Get AI-powered irrigation recommendations based on soil conditions and weather
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="soil_moisture">Soil Moisture (%)</Label>
              <Input
                id="soil_moisture"
                type="number"
                min="0"
                max="100"
                placeholder="e.g., 45"
                value={formData.soil_moisture}
                onChange={(e) => setFormData(prev => ({ ...prev, soil_moisture: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="crop_type">Crop Type</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, crop_type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  {cropTypes.map((crop) => (
                    <SelectItem key={crop} value={crop.toLowerCase()}>
                      {crop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="weather_forecast">Weather Forecast</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, weather_forecast: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select weather" />
                </SelectTrigger>
                <SelectContent>
                  {weatherOptions.map((weather) => (
                    <SelectItem key={weather.value} value={weather.value}>
                      {weather.icon} {weather.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            onClick={getIrrigationAdvice}
            disabled={loading || !formData.soil_moisture || !formData.crop_type || !formData.weather_forecast}
            className="w-full bg-gradient-sky"
          >
            {loading ? "Analyzing..." : "Get Irrigation Advice"}
          </Button>
        </CardContent>
      </Card>

      {advice && (
        <Card className="shadow-glow animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-sky" />
              Irrigation Recommendation
              <Badge variant={getUrgencyColor(advice.urgency) as any} className="ml-auto">
                {advice.urgency} priority
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gradient-sky rounded-lg text-sky-foreground">
                <Droplets className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm opacity-90">Current Moisture</p>
                <p className="text-2xl font-bold">{advice.soil_moisture}%</p>
                <Badge variant={getMoistureStatus(advice.soil_moisture).color as any} className="mt-1">
                  {getMoistureStatus(advice.soil_moisture).status}
                </Badge>
              </div>
              
              <div className="text-center p-4 bg-gradient-primary rounded-lg text-primary-foreground">
                <Thermometer className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm opacity-90">Crop Type</p>
                <p className="text-lg font-semibold capitalize">{advice.crop}</p>
              </div>
              
              <div className="text-center p-4 bg-gradient-earth rounded-lg text-earth-foreground">
                <Cloud className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm opacity-90">Weather</p>
                <p className="text-lg font-semibold capitalize">{advice.weather_forecast}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Soil Moisture Range</span>
                  <span className="text-sm text-muted-foreground">
                    Optimal: {advice.optimal_moisture_range[0]}% - {advice.optimal_moisture_range[1]}%
                  </span>
                </div>
                <Progress value={advice.soil_moisture} className="h-2" />
              </div>

              <Alert className={`border-${getUrgencyColor(advice.urgency)}`}>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Recommendation:</strong> {advice.advice}
                </AlertDescription>
              </Alert>

              {advice.recommended_water_amount > 0 && (
                <div className="p-4 bg-sky/10 border border-sky/20 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-sky" />
                    Irrigation Schedule
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Recommended Amount</p>
                      <p className="font-semibold">{advice.recommended_water_amount}mm</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Next Check</p>
                      <p className="font-semibold">{advice.next_check}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IrrigationMonitor;