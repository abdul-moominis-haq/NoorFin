
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useState, useEffect } from "react";

export function PortfolioSummary() {
  const [portfolioData, setPortfolioData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [portfolioValue, setPortfolioValue] = useState({ total: 0, change: 0, changePercent: 0 });

  useEffect(() => {
    // Simulate loading portfolio data
    setTimeout(() => {
      const data = [
        { name: "Stocks", value: 45000, color: "#4CAF50" },
        { name: "Crypto", value: 15000, color: "#FF9800" },
        { name: "ETFs", value: 25000, color: "#2196F3" },
        { name: "Bonds", value: 8000, color: "#9C27B0" },
        { name: "Cash", value: 7000, color: "#607D8B" }
      ];
      
      setPortfolioData(data);
      
      const total = data.reduce((sum, item) => sum + item.value, 0);
      setPortfolioValue({
        total,
        change: 4830.75,
        changePercent: 4.83
      });
      
      setIsLoading(false);
    }, 1200);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Summary</CardTitle>
        <CardDescription>Your asset allocation overview</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-6">
            <div className="h-40 w-40 rounded-full bg-gray-800 animate-pulse"></div>
            <div className="h-8 w-40 bg-gray-800 rounded animate-pulse"></div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-sm font-medium text-gray-400">Total Portfolio Value</h3>
              <div className="text-3xl font-bold my-1">
                ${portfolioValue.total.toLocaleString()}
              </div>
              <div className={`text-sm inline-flex items-center ${portfolioValue.change >= 0 ? 'positive-change' : 'negative-change'}`}>
                {portfolioValue.change >= 0 ? '+' : ''}${Math.abs(portfolioValue.change).toLocaleString()} 
                <span className="ml-1">
                  ({portfolioValue.changePercent >= 0 ? '+' : ''}{portfolioValue.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
            
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolioData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {portfolioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
                    contentStyle={{ 
                      backgroundColor: "#1E1E1E", 
                      border: "1px solid #333",
                      borderRadius: "4px"
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="finance-card p-3">
                <div className="metric-label">Top Performer</div>
                <div className="metric-value">NVDA</div>
                <div className="positive-change">+18.42%</div>
              </div>
              <div className="finance-card p-3">
                <div className="metric-label">Bottom Performer</div>
                <div className="metric-value">TSLA</div>
                <div className="negative-change">-6.19%</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
