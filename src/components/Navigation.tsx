import { Cloud, Calculator, Leaf, Droplets, Activity, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "weather", label: "Weather", icon: Cloud },
    { id: "carbon", label: "Carbon Footprint", icon: Calculator },
    { id: "crops", label: "Crop Health", icon: Leaf },
    { id: "irrigation", label: "Irrigation", icon: Droplets },
    { id: "iot", label: "IoT Sensors", icon: Activity },
  ];

  return (
    <nav className="flex flex-wrap gap-2 p-4 bg-card border border-border rounded-lg shadow-card">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "default" : "outline"}
            onClick={() => setActiveTab(item.id)}
            className="flex items-center gap-2"
          >
            <Icon className="h-4 w-4" />
            <span className="hidden sm:inline">{item.label}</span>
          </Button>
        );
      })}
    </nav>
  );
};

export default Navigation;