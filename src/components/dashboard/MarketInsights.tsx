
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Newspaper, TrendingUp, TrendingDown } from "lucide-react";
import { useState, useEffect } from "react";

interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  relevance: number;
}

export function MarketInsights() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading news data
    setTimeout(() => {
      setNews([
        {
          id: "1",
          title: "Fed signals potential interest rate cut in September amid cooling inflation",
          source: "Financial Times",
          time: "2h ago",
          sentiment: "positive",
          relevance: 0.92
        },
        {
          id: "2",
          title: "NVIDIA reports record quarterly earnings, exceeding analyst expectations",
          source: "Wall Street Journal",
          time: "4h ago",
          sentiment: "positive",
          relevance: 0.88
        },
        {
          id: "3",
          title: "Oil prices drop as OPEC+ considers increasing production",
          source: "Bloomberg",
          time: "6h ago",
          sentiment: "negative",
          relevance: 0.75
        },
        {
          id: "4",
          title: "Treasury yields slip as investors await key economic data",
          source: "CNBC",
          time: "8h ago",
          sentiment: "neutral",
          relevance: 0.68
        },
        {
          id: "5",
          title: "European stocks retreat as manufacturing activity contracts",
          source: "Reuters",
          time: "10h ago",
          sentiment: "negative",
          relevance: 0.72
        }
      ]);
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg">Market Insights</CardTitle>
          <CardDescription>AI-powered news analysis and market sentiment</CardDescription>
        </div>
        <Badge variant="outline" className="font-normal gap-1">
          <Newspaper className="h-3 w-3" />
          Live Updates
        </Badge>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="animate-pulse flex items-start space-x-3">
                <div className="h-10 w-10 rounded-full bg-gray-800"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {news.map((item) => (
              <div key={item.id} className="flex items-start space-x-3 p-2 hover:bg-gray-900 rounded-lg transition-colors cursor-pointer group">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  item.sentiment === 'positive' ? 'bg-green-900/30 text-green-500' : 
                  item.sentiment === 'negative' ? 'bg-red-900/30 text-red-500' : 
                  'bg-gray-800 text-gray-400'
                }`}>
                  {item.sentiment === 'positive' ? <TrendingUp className="h-5 w-5" /> :
                   item.sentiment === 'negative' ? <TrendingDown className="h-5 w-5" /> :
                   <Newspaper className="h-5 w-5" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-sm group-hover:text-blue-400 transition-colors">{item.title}</h4>
                    <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex items-center text-xs text-gray-400 mt-1">
                    <span>{item.source}</span>
                    <span className="mx-2">•</span>
                    <span>{item.time}</span>
                    <div className="ml-auto flex items-center">
                      <Badge variant="outline" className={`text-xs py-0 h-5 px-1.5 ${
                        item.sentiment === 'positive' ? 'border-green-800 text-green-500' :
                        item.sentiment === 'negative' ? 'border-red-800 text-red-500' :
                        'border-gray-700 text-gray-400'
                      }`}>
                        {item.sentiment === 'positive' ? 'Bullish' :
                         item.sentiment === 'negative' ? 'Bearish' : 'Neutral'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
