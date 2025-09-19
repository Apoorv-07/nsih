import { useState } from "react";
import { Leaf, Upload, Camera, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CropHealthMonitor = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setResults(null);
    }
  };

  const analyzeCrop = async () => {
    if (!selectedFile) return;
    
    setLoading(true);
    
    // Mock AI analysis - replace with real API when backend is connected
    setTimeout(() => {
      const diseases = ["Healthy", "Leaf Blight", "Rust", "Powdery Mildew"];
      const prediction = diseases[Math.floor(Math.random() * diseases.length)];
      const confidence = Math.floor(Math.random() * 30) + 70;
      
      const mockResults = {
        filename: selectedFile?.name,
        prediction,
        confidence: `${confidence}%`,
        recommendation: prediction === "Healthy" 
          ? "Your crop looks healthy! Continue current care practices." 
          : `Detected ${prediction}. Apply appropriate fungicide spray and monitor closely.`,
        severity: prediction === "Healthy" ? "low" : Math.random() > 0.5 ? "medium" : "high"
      };
      
      setResults(mockResults);
      setLoading(false);
    }, 2000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low": return "success";
      case "medium": return "warning";
      case "high": return "destructive";
      default: return "secondary";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "low": return CheckCircle;
      case "medium": return AlertTriangle;
      case "high": return AlertTriangle;
      default: return Leaf;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-success" />
            Crop Disease Detection
          </CardTitle>
          <CardDescription>
            Upload crop photos for AI-powered disease detection and treatment recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="crop-upload"
            />
            <label htmlFor="crop-upload" className="cursor-pointer">
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Camera className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-semibold">Upload Crop Image</p>
                  <p className="text-sm text-muted-foreground">
                    Click to select or drag and drop your crop photo
                  </p>
                </div>
              </div>
            </label>
          </div>

          {selectedFile && (
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  <span className="font-medium">{selectedFile.name}</span>
                </div>
                <Button 
                  onClick={analyzeCrop}
                  disabled={loading}
                  className="bg-gradient-success"
                >
                  {loading ? "Analyzing..." : "Analyze Crop"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {results && (
        <Card className="shadow-glow animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-success" />
              Analysis Results
              <Badge variant={getSeverityColor(results.severity) as any} className="ml-auto">
                {results.confidence} confidence
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-primary rounded-lg text-primary-foreground">
                <p className="text-sm opacity-90">Detected Condition</p>
                <p className="text-xl font-bold">{results.prediction}</p>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Image Analyzed</p>
                <p className="font-semibold">{results.filename}</p>
              </div>
            </div>

            <Alert className={`border-${getSeverityColor(results.severity)}`}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Treatment Recommendation:</strong> {results.recommendation}
              </AlertDescription>
            </Alert>

            {results.prediction !== "Healthy" && (
              <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                <h4 className="font-semibold mb-2 text-warning-foreground">Immediate Actions:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Isolate affected plants if possible</li>
                  <li>• Apply appropriate fungicide treatment</li>
                  <li>• Monitor surrounding crops closely</li>
                  <li>• Improve air circulation around plants</li>
                  <li>• Consider consulting with agricultural expert</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CropHealthMonitor;