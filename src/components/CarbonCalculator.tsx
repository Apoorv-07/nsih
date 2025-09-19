import { useState } from "react";
import { Calculator, Leaf, TrendingDown, Lightbulb } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const CarbonCalculator = () => {
  const [formData, setFormData] = useState({
    farm_id: "",
    area_ha: "",
    diesel_liters: "",
    electricity_kwh: "",
    fertilizer_kg: "",
    manure_tons: "",
    enteric_fermentation: "",
    rice_paddies: "",
    tillage: "",
    lime: "",
    soil_sequestration: "",
  });

  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateFootprint = async () => {
    setLoading(true);
    
    // Mock calculation - replace with real API when backend is connected
    setTimeout(() => {
      const mockResults = {
        farm_id: formData.farm_id || "FARM001",
        area_ha: parseFloat(formData.area_ha) || 10,
        emissions: {
          total_tCO2e: 15.4,
          tCO2e_per_ha: 1.54,
          emissions_breakdown: {
            diesel_tCO2e: 8.2,
            electricity_tCO2e: 3.1,
            fertilizer_tCO2e: 2.8,
            manure_tCO2e: 1.3,
          },
          top_contributors: ["diesel_tCO2e", "electricity_tCO2e", "fertilizer_tCO2e"]
        },
        sustainability_score: 78,
        recommendations: [
          "Consider switching to biodiesel or electric tractors.",
          "Install solar panels to reduce electricity emissions.",
          "Optimize fertilizer use with precision application."
        ]
      };
      setResults(mockResults);
      setLoading(false);
    }, 1500);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Carbon Footprint Calculator
          </CardTitle>
          <CardDescription>
            Calculate your farm's carbon emissions and get sustainability recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="farm_id">Farm ID</Label>
              <Input
                id="farm_id"
                placeholder="e.g., FARM001"
                value={formData.farm_id}
                onChange={(e) => handleInputChange("farm_id", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="area_ha">Farm Area (hectares)</Label>
              <Input
                id="area_ha"
                type="number"
                placeholder="e.g., 10"
                value={formData.area_ha}
                onChange={(e) => handleInputChange("area_ha", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="diesel_liters">Diesel Usage (liters/year)</Label>
              <Input
                id="diesel_liters"
                type="number"
                placeholder="e.g., 1000"
                value={formData.diesel_liters}
                onChange={(e) => handleInputChange("diesel_liters", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="electricity_kwh">Electricity (kWh/year)</Label>
              <Input
                id="electricity_kwh"
                type="number"
                placeholder="e.g., 5000"
                value={formData.electricity_kwh}
                onChange={(e) => handleInputChange("electricity_kwh", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fertilizer_kg">Fertilizer (kg/year)</Label>
              <Input
                id="fertilizer_kg"
                type="number"
                placeholder="e.g., 500"
                value={formData.fertilizer_kg}
                onChange={(e) => handleInputChange("fertilizer_kg", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="manure_tons">Manure (tons/year)</Label>
              <Input
                id="manure_tons"
                type="number"
                placeholder="e.g., 20"
                value={formData.manure_tons}
                onChange={(e) => handleInputChange("manure_tons", e.target.value)}
              />
            </div>
          </div>
          
          <Button 
            onClick={calculateFootprint}
            disabled={loading}
            className="w-full bg-gradient-primary"
          >
            {loading ? "Calculating..." : "Calculate Carbon Footprint"}
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Card className="shadow-glow animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-success" />
              Carbon Footprint Results
              <Badge variant="outline" className="ml-auto">
                Farm: {results.farm_id}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gradient-primary rounded-lg text-primary-foreground">
                <p className="text-sm opacity-90">Total Emissions</p>
                <p className="text-2xl font-bold">{results.emissions.total_tCO2e} tCO₂e</p>
              </div>
              
              <div className="text-center p-4 bg-gradient-earth rounded-lg text-earth-foreground">
                <p className="text-sm opacity-90">Per Hectare</p>
                <p className="text-2xl font-bold">{results.emissions.tCO2e_per_ha} tCO₂e/ha</p>
              </div>
              
              <div className="text-center p-4 bg-background border border-border rounded-lg">
                <p className="text-sm text-muted-foreground">Sustainability Score</p>
                <p className={`text-2xl font-bold ${getScoreColor(results.sustainability_score)}`}>
                  {results.sustainability_score}/100
                </p>
                <Progress value={results.sustainability_score} className="mt-2" />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <TrendingDown className="h-4 w-4" />
                Emissions Breakdown
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(results.emissions.emissions_breakdown).map(([key, value]) => (
                  <div key={key} className="flex justify-between p-2 bg-muted rounded">
                    <span className="text-sm capitalize">{key.replace('_tCO2e', '').replace('_', ' ')}</span>
                    <span className="font-semibold">{String(value)} tCO₂e</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-accent" />
                Recommendations
              </h4>
              <div className="space-y-2">
                {results.recommendations.map((rec: string, index: number) => (
                  <div key={index} className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
                    <p className="text-sm">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CarbonCalculator;