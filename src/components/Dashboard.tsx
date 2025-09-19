import { Leaf, TrendingUp, Droplets, Thermometer, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  // Mock dashboard data - replace with real data when backend is connected
  const dashboardStats = {
    totalFarms: 3,
    healthyFields: 2,
    alertsActive: 1,
    avgSustainabilityScore: 78,
    todayWeather: {
      location: "Delhi",
      temp: 28,
      condition: "Partly Cloudy",
      humidity: 65
    },
    recentAlerts: [
      { id: 1, type: "irrigation", message: "Low soil moisture detected in Field A", severity: "medium" },
      { id: 2, type: "disease", message: "Potential leaf blight in tomato crop", severity: "high" },
      { id: 3, type: "weather", message: "Heavy rain expected tomorrow", severity: "low" }
    ],
    carbonFootprint: {
      thisMonth: 15.4,
      lastMonth: 18.2,
      reduction: 15.4
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "destructive";
      case "medium": return "warning"; 
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-primary text-primary-foreground p-6 rounded-lg shadow-glow animate-fade-in">
        <h1 className="text-2xl font-bold mb-2">Welcome to Farmyy Dashboard</h1>
        <p className="opacity-90">Smart Agriculture Management Platform</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-card animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-success/10 rounded-full">
                <Leaf className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Farms</p>
                <p className="text-2xl font-bold">{dashboardStats.totalFarms}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Healthy Fields</p>
                <p className="text-2xl font-bold">{dashboardStats.healthyFields}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-warning/10 rounded-full">
                <AlertTriangle className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-bold">{dashboardStats.alertsActive}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-earth/10 rounded-full">
                <TrendingUp className="h-6 w-6 text-earth" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sustainability Score</p>
                <p className="text-2xl font-bold">{dashboardStats.avgSustainabilityScore}%</p>
                <Progress value={dashboardStats.avgSustainabilityScore} className="mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weather Widget */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-sky" />
              Today's Weather
            </CardTitle>
            <CardDescription>{dashboardStats.todayWeather.location}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">{dashboardStats.todayWeather.temp}°C</p>
                <p className="text-muted-foreground">{dashboardStats.todayWeather.condition}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Droplets className="h-4 w-4" />
                  <span>{dashboardStats.todayWeather.humidity}% humidity</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Carbon Footprint Summary */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-success" />
              Carbon Footprint
            </CardTitle>
            <CardDescription>Monthly emissions tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">This Month</span>
                <span className="text-lg font-bold">{dashboardStats.carbonFootprint.thisMonth} tCO₂e</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Last Month</span>
                <span className="text-lg">{dashboardStats.carbonFootprint.lastMonth} tCO₂e</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-sm text-success font-medium">
                  {dashboardStats.carbonFootprint.reduction}% reduction
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Recent Alerts
          </CardTitle>
          <CardDescription>
            Latest notifications from your farm monitoring systems
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {dashboardStats.recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <p className="text-sm">{alert.message}</p>
                <Badge variant={getSeverityColor(alert.severity) as any}>
                  {alert.severity}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks and recommendations for today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-primary rounded-lg text-primary-foreground">
              <h4 className="font-semibold mb-2">Check Irrigation</h4>
              <p className="text-sm opacity-90">Field A moisture levels are low</p>
            </div>
            
            <div className="p-4 bg-gradient-earth rounded-lg text-earth-foreground">
              <h4 className="font-semibold mb-2">Crop Analysis</h4>
              <p className="text-sm opacity-90">Upload photos for disease detection</p>
            </div>
            
            <div className="p-4 bg-gradient-success rounded-lg text-success-foreground">
              <h4 className="font-semibold mb-2">Weather Alert</h4>
              <p className="text-sm opacity-90">Rain expected tomorrow morning</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;