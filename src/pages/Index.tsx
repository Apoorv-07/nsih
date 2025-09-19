import { useState } from "react";
import { Sprout } from "lucide-react";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import WeatherCard from "@/components/WeatherCard";
import CarbonCalculator from "@/components/CarbonCalculator";
import CropHealthMonitor from "@/components/CropHealthMonitor";
import IrrigationMonitor from "@/components/IrrigationMonitor";
import IoTDashboard from "@/components/IoTDashboard";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "weather":
        return <WeatherCard />;
      case "carbon":
        return <CarbonCalculator />;
      case "crops":
        return <CropHealthMonitor />;
      case "irrigation":
        return <IrrigationMonitor />;
      case "iot":
        return <IoTDashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <Sprout className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Farmyy</h1>
              <p className="text-sm text-muted-foreground">Smart Agriculture Platform</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="animate-fade-in">
          {renderActiveComponent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Farmyy - Smart Agriculture Management Platform
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;