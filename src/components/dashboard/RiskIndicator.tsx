
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertCircle } from "lucide-react";

interface RiskIndicatorProps {
  riskScore: number; // 0-100
  size?: "sm" | "md" | "lg";
}

export function RiskIndicator({ riskScore, size = "md" }: RiskIndicatorProps) {
  // Determine risk level
  const getRiskLevel = (score: number) => {
    if (score < 30) return { level: "Low", color: "bg-green-500" };
    if (score < 70) return { level: "Medium", color: "bg-yellow-500" };
    return { level: "High", color: "bg-red-500" };
  };

  const { level, color } = getRiskLevel(riskScore);
  
  // Size classes
  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3"
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="w-full space-y-1">
            <div className="flex justify-between items-center">
              <div className="text-xs flex items-center gap-1">
                <AlertCircle className="h-3 w-3 text-gray-400" />
                <span>Risk Level: <span className={`font-medium ${
                  level === "Low" ? "text-green-500" : 
                  level === "Medium" ? "text-yellow-500" : 
                  "text-red-500"
                }`}>{level}</span></span>
              </div>
              <span className="text-xs text-gray-400">{riskScore}/100</span>
            </div>
            <Progress value={riskScore} max={100} className={`${sizeClasses[size]} bg-gray-800`}>
              <div 
                className={`h-full ${color} transition-all duration-500`} 
                style={{ width: `${riskScore}%` }}
              />
            </Progress>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top">
          <div className="text-sm">
            <p className="font-medium mb-1">Risk Score: {riskScore}/100</p>
            <p className="text-xs text-gray-300">
              {level === "Low" && "Lower risk generally means more stable returns but potentially lower growth."}
              {level === "Medium" && "Balanced risk with moderate potential for both growth and volatility."}
              {level === "High" && "Higher risk with potential for greater returns but also increased volatility."}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
