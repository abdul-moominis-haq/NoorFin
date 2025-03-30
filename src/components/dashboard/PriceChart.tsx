
import { useState, useEffect } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PriceChartProps {
  assetType: string;
}

export function PriceChart({ assetType }: PriceChartProps) {
  const [data, setData] = useState<any[]>([]);
  const [timeframe, setTimeframe] = useState("1d");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    // Generate random data based on asset type and timeframe
    setTimeout(() => {
      const generateData = () => {
        const now = new Date();
        const dataPoints = timeframe === "1d" ? 24 : 
                          timeframe === "1w" ? 7 : 
                          timeframe === "1m" ? 30 : 
                          timeframe === "1y" ? 12 : 24;
        
        let baseValue = assetType === "stocks" ? 150 : 
                       assetType === "crypto" ? 50000 : 
                       assetType === "forex" ? 1.2 : 1800;
        
        const volatility = assetType === "crypto" ? 0.08 : 
                          assetType === "stocks" ? 0.02 : 0.01;
        
        const mockData = [];
        
        for (let i = 0; i < dataPoints; i++) {
          const change = baseValue * volatility * (Math.random() - 0.5);
          baseValue += change;
          
          let label;
          if (timeframe === "1d") {
            label = `${(24 - i) % 12 || 12}${(24 - i) >= 12 ? 'PM' : 'AM'}`;
          } else if (timeframe === "1w") {
            const day = new Date();
            day.setDate(now.getDate() - (6 - i));
            label = day.toLocaleDateString('en-US', { weekday: 'short' });
          } else if (timeframe === "1m") {
            const day = new Date();
            day.setDate(now.getDate() - (29 - i));
            label = `${day.getMonth() + 1}/${day.getDate()}`;
          } else {
            const month = new Date();
            month.setMonth(now.getMonth() - (11 - i));
            label = month.toLocaleDateString('en-US', { month: 'short' });
          }
          
          mockData.push({
            name: label,
            value: baseValue,
            volume: Math.floor(Math.random() * 1000000)
          });
        }
        
        return mockData;
      };
      
      setData(generateData());
      setIsLoading(false);
    }, 1000);
  }, [assetType, timeframe]);

  const chartColor = assetType === "stocks" ? "#4CAF50" : 
                    assetType === "crypto" ? "#FF9800" : 
                    assetType === "forex" ? "#2196F3" : "#E91E63";

  const prettyLabel = assetType === "stocks" ? "S&P 500" : 
                     assetType === "crypto" ? "Bitcoin (BTC)" : 
                     assetType === "forex" ? "EUR/USD" : "Gold";

  return (
    <Card className="mt-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">
          {prettyLabel} Price Chart
        </CardTitle>
        <Tabs value={timeframe} onValueChange={setTimeframe} className="w-auto">
          <TabsList className="grid grid-cols-4 h-8">
            <TabsTrigger value="1d" className="text-xs px-2">1D</TabsTrigger>
            <TabsTrigger value="1w" className="text-xs px-2">1W</TabsTrigger>
            <TabsTrigger value="1m" className="text-xs px-2">1M</TabsTrigger>
            <TabsTrigger value="1y" className="text-xs px-2">1Y</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-[300px] w-full flex items-center justify-center">
            <div className="animate-pulse-gentle">Loading chart data...</div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id={`color${assetType}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColor} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
              <XAxis 
                dataKey="name" 
                stroke="#888" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="#888" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(value) => {
                  if (assetType === "crypto" && value >= 1000) {
                    return `$${(value/1000).toFixed(1)}k`;
                  }
                  return value.toLocaleString();
                }} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#1E1E1E", 
                  border: "1px solid #333",
                  borderRadius: "4px",
                  fontSize: "12px"
                }}
                formatter={(value: number) => [
                  assetType === "forex" 
                    ? value.toFixed(4) 
                    : value.toLocaleString('en-US', { 
                        style: 'currency', 
                        currency: 'USD',
                        minimumFractionDigits: assetType === "crypto" ? 2 : 2,
                        maximumFractionDigits: assetType === "crypto" ? 2 : 2
                      }),
                  "Price"
                ]}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={chartColor} 
                fillOpacity={1}
                fill={`url(#color${assetType})`} 
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
