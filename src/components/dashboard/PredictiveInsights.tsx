
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Tooltip
} from "recharts";
import { Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

interface Prediction {
  sector: string;
  score: number;
  description: string;
}

export function PredictiveInsights() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading AI prediction data
    setTimeout(() => {
      setPredictions([
        { sector: "Technology", score: 85, description: "Strong growth potential in AI and semiconductor stocks" },
        { sector: "Healthcare", score: 72, description: "Positive outlook due to aging population and innovation" },
        { sector: "Energy", score: 43, description: "Volatility expected with transition to renewables" },
        { sector: "Finance", score: 65, description: "Moderate growth opportunity with easing interest rates" },
        { sector: "Consumer", score: 57, description: "Mixed signals depending on inflation trajectory" },
        { sector: "Materials", score: 38, description: "Challenges due to global supply chain disruptions" }
      ]);
      setIsLoading(false);
    }, 1800);
  }, []);

  const chartData = predictions.map(item => ({
    subject: item.sector,
    A: item.score,
    fullMark: 100
  }));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="space-y-1">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            AI Predictive Insights
          </CardTitle>
          <CardDescription>Sector performance forecast for next 90 days</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-[300px] flex items-center justify-center">
            <div className="animate-pulse-gentle">Generating AI predictions...</div>
          </div>
        ) : (
          <div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                  <PolarGrid stroke="#444" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#888', fontSize: 10 }} />
                  <Radar
                    name="Opportunity Score"
                    dataKey="A"
                    stroke="#1E88E5"
                    fill="#1E88E5"
                    fillOpacity={0.6}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#1E1E1E", 
                      border: "1px solid #333",
                      borderRadius: "4px" 
                    }}
                    formatter={(value: number) => [`${value}/100`, 'Opportunity Score']}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 space-y-2">
              <h4 className="text-sm font-medium">Key Predictions</h4>
              <div className="grid grid-cols-1 gap-2">
                {predictions
                  .sort((a, b) => b.score - a.score)
                  .slice(0, 3)
                  .map((item, i) => (
                    <div key={i} className="finance-card p-3">
                      <div className="flex justify-between items-center mb-1">
                        <h5 className="font-medium">{item.sector}</h5>
                        <div className={`text-sm font-mono ${
                          item.score >= 70 ? 'text-finance-positive' :
                          item.score < 50 ? 'text-finance-negative' :
                          'text-finance-neutral'
                        }`}>
                          {item.score}/100
                        </div>
                      </div>
                      <p className="text-xs text-gray-400">{item.description}</p>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
