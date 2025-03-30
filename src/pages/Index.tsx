
import { MarketOverview } from "@/components/dashboard/MarketOverview";
import { PortfolioSummary } from "@/components/dashboard/PortfolioSummary";
import { MarketInsights } from "@/components/dashboard/MarketInsights";
import { PredictiveInsights } from "@/components/dashboard/PredictiveInsights";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { InvestmentGuide } from "@/components/dashboard/InvestmentGuide";

const Index = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      
      <InvestmentGuide />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <QuickActions />
          <MarketOverview />
          <MarketInsights />
        </div>
        <div className="space-y-6">
          <PortfolioSummary />
          <PredictiveInsights />
        </div>
      </div>
    </div>
  );
};

export default Index;
