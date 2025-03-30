
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertCircle, BookOpen, TrendingUp, Shield, Info } from "lucide-react";

interface RiskLevelProps {
  level: "low" | "medium" | "high";
  description: string;
}

const RiskLevel = ({ level, description }: RiskLevelProps) => {
  const colors = {
    low: "bg-green-900/20 text-green-500 border-green-800",
    medium: "bg-yellow-900/20 text-yellow-500 border-yellow-800",
    high: "bg-red-900/20 text-red-500 border-red-800"
  };

  return (
    <div className={`p-4 rounded-lg border ${colors[level]} mb-4`}>
      <div className="flex items-center gap-2 mb-2">
        {level === "low" && <Shield className="h-5 w-5" />}
        {level === "medium" && <AlertCircle className="h-5 w-5" />}
        {level === "high" && <TrendingUp className="h-5 w-5" />}
        <h3 className="font-medium capitalize">{level} Risk</h3>
      </div>
      <p className="text-sm text-gray-300">{description}</p>
    </div>
  );
};

export function InvestmentGuide() {
  const [knowledgeLevel, setKnowledgeLevel] = useState<string>("beginner");

  const glossary = [
    { term: "ETF", definition: "Exchange-Traded Fund - A type of investment fund that tracks an index, sector, commodity, or asset, but can be purchased or sold on a stock exchange like a regular stock." },
    { term: "P/E Ratio", definition: "Price-to-Earnings Ratio - A valuation metric that compares a company's current share price to its earnings per share (EPS)." },
    { term: "Market Cap", definition: "The total value of a company's outstanding shares of stock, calculated by multiplying the total number of shares by the current share price." },
    { term: "Dividend", definition: "A portion of a company's earnings paid to shareholders, usually in cash or additional stock." },
    { term: "Volatility", definition: "A measure of the rate at which the price of a security increases or decreases over a particular period." }
  ];

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-400" />
            Investment Guide
          </CardTitle>
          <CardDescription>Personalized guidance based on your experience level</CardDescription>
        </div>
        <Badge variant="outline" className="capitalize">{knowledgeLevel}</Badge>
      </CardHeader>
      <CardContent>
        <Tabs value={knowledgeLevel} onValueChange={setKnowledgeLevel} className="mb-6">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="beginner">Beginner</TabsTrigger>
            <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="beginner">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Getting Started with Investing</h3>
              <p className="text-gray-300">
                New to investing? Start with low-risk options like ETFs or index funds that track major markets.
                Focus on diversification and long-term growth rather than short-term gains.
              </p>
              
              <h4 className="font-medium mt-4">Recommended Asset Classes:</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>Index Funds (S&P 500, Total Market)</li>
                <li>High-yield Savings Accounts</li>
                <li>Treasury Securities</li>
                <li>Blue-chip Dividend Stocks</li>
              </ul>
              
              <RiskLevel 
                level="low" 
                description="Focus on capital preservation and steady growth. These investments typically have lower returns but higher stability."
              />
            </div>
          </TabsContent>
          
          <TabsContent value="intermediate">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Building a Balanced Portfolio</h3>
              <p className="text-gray-300">
                With some experience, you can diversify across more asset classes and potentially increase returns.
                Consider a mix of growth stocks, bonds, and alternative investments.
              </p>
              
              <h4 className="font-medium mt-4">Recommended Asset Classes:</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>Individual Stocks (Mix of value and growth)</li>
                <li>Sector ETFs</li>
                <li>REITs (Real Estate Investment Trusts)</li>
                <li>Corporate Bonds</li>
                <li>Established Cryptocurrencies (small allocation)</li>
              </ul>
              
              <RiskLevel 
                level="medium" 
                description="Balance between growth and safety. This approach accepts moderate volatility for potentially higher long-term returns."
              />
            </div>
          </TabsContent>
          
          <TabsContent value="advanced">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Advanced Investment Strategies</h3>
              <p className="text-gray-300">
                With substantial market knowledge, you can employ more sophisticated strategies and
                consider higher-risk, higher-reward opportunities alongside your core portfolio.
              </p>
              
              <h4 className="font-medium mt-4">Recommended Asset Classes:</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>Options Strategies</li>
                <li>Alternative Investments (P2P lending, Venture Capital)</li>
                <li>Commodities</li>
                <li>Forex</li>
                <li>Emerging Market Securities</li>
                <li>Diversified Cryptocurrency Portfolio</li>
              </ul>
              
              <RiskLevel 
                level="high" 
                description="Seeks significant growth with acceptance of higher volatility. Requires active management and deeper market understanding."
              />
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 border-t border-gray-800 pt-4">
          <div className="flex items-center gap-2 mb-3">
            <Info className="h-4 w-4 text-blue-400" />
            <h3 className="font-medium">Financial Terms Glossary</h3>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {glossary.map((item) => (
              <TooltipProvider key={item.term}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="px-3 py-2 rounded-md bg-gray-900 hover:bg-gray-800 transition-colors cursor-help flex justify-between items-center">
                      <span className="font-medium">{item.term}</span>
                      <Badge variant="outline" className="bg-gray-800 flex items-center gap-1">
                        <Info className="h-3 w-3" />
                        Info
                      </Badge>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-sm">
                    <p>{item.definition}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
