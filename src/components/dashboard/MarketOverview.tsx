
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { PriceChart } from "./PriceChart";
import { RiskIndicator } from "./RiskIndicator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface Market {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  riskScore: number;
}

interface MarketOverviewProps {
  selectedCurrency?: string;
  currencySymbol?: string;
  convertCurrency?: (value: number) => string;
}

export function MarketOverview({ 
  selectedCurrency = "USD", 
  currencySymbol = "$", 
  convertCurrency = (value: number) => value.toString() 
}: MarketOverviewProps) {
  const [markets, setMarkets] = useState<{ [key: string]: Market[] }>({
    stocks: [],
    bonds: [],
    mutual_funds: [],
    index_funds: [],
    etfs: [],
    reits: [],
    commodities: [],
    crypto: [],
    cds: [],
    p2p: [],
    annuities: [],
    treasury: [],
    savings: [],
    collectibles: [],
    venture_capital: [],
    forex: [],
    esg: []
  });
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading market data
    const timer = setTimeout(() => {
      setMarkets({
        stocks: [
          { id: "aapl", name: "Apple Inc.", symbol: "AAPL", price: 183.58, change: 1.28, changePercent: 0.72, volume: "57.3M", marketCap: "2.87T", riskScore: 35 },
          { id: "msft", name: "Microsoft", symbol: "MSFT", price: 412.46, change: -2.16, changePercent: -0.51, volume: "21.2M", marketCap: "3.06T", riskScore: 30 },
          { id: "googl", name: "Alphabet Inc.", symbol: "GOOGL", price: 161.28, change: 0.54, changePercent: 0.34, volume: "18.7M", marketCap: "2.02T", riskScore: 40 },
          { id: "amzn", name: "Amazon.com", symbol: "AMZN", price: 178.15, change: 3.21, changePercent: 1.83, volume: "32.5M", marketCap: "1.86T", riskScore: 45 },
          { id: "tsla", name: "Tesla, Inc.", symbol: "TSLA", price: 194.05, change: -5.32, changePercent: -2.67, volume: "89.4M", marketCap: "618.2B", riskScore: 75 }
        ],
        bonds: [
          { id: "us10y", name: "US 10 Year Treasury", symbol: "US10Y", price: 4.35, change: 0.03, changePercent: 0.69, volume: "N/A", marketCap: "N/A", riskScore: 25 },
          { id: "us30y", name: "US 30 Year Treasury", symbol: "US30Y", price: 4.52, change: 0.02, changePercent: 0.44, volume: "N/A", marketCap: "N/A", riskScore: 30 },
          { id: "de10y", name: "German 10 Year", symbol: "DE10Y", price: 2.41, change: -0.01, changePercent: -0.41, volume: "N/A", marketCap: "N/A", riskScore: 20 }
        ],
        mutual_funds: [
          { id: "vfinx", name: "Vanguard 500 Index Fund", symbol: "VFINX", price: 444.23, change: 1.25, changePercent: 0.28, volume: "1.2M", marketCap: "730.1B", riskScore: 40 },
          { id: "fcntx", name: "Fidelity Contrafund", symbol: "FCNTX", price: 17.85, change: 0.12, changePercent: 0.68, volume: "850K", marketCap: "98.4B", riskScore: 45 },
          { id: "agthx", name: "American Funds Growth Fund", symbol: "AGTHX", price: 72.14, change: -0.42, changePercent: -0.58, volume: "620K", marketCap: "187.6B", riskScore: 40 }
        ],
        index_funds: [
          { id: "voo", name: "Vanguard S&P 500 ETF", symbol: "VOO", price: 470.21, change: 1.87, changePercent: 0.40, volume: "4.2M", marketCap: "361.8B", riskScore: 35 },
          { id: "vti", name: "Vanguard Total Stock Market", symbol: "VTI", price: 249.87, change: 0.95, changePercent: 0.38, volume: "3.1M", marketCap: "342.7B", riskScore: 35 },
          { id: "vxus", name: "Vanguard Total Int'l Stock", symbol: "VXUS", price: 60.25, change: -0.32, changePercent: -0.53, volume: "2.4M", marketCap: "72.3B", riskScore: 45 }
        ],
        etfs: [
          { id: "spy", name: "SPDR S&P 500 ETF", symbol: "SPY", price: 468.85, change: 1.95, changePercent: 0.42, volume: "58.3M", marketCap: "438.7B", riskScore: 35 },
          { id: "qqq", name: "Invesco QQQ Trust", symbol: "QQQ", price: 437.25, change: 3.12, changePercent: 0.72, volume: "32.7M", marketCap: "231.5B", riskScore: 45 },
          { id: "arkk", name: "ARK Innovation ETF", symbol: "ARKK", price: 48.23, change: -1.45, changePercent: -2.92, volume: "14.2M", marketCap: "8.2B", riskScore: 80 }
        ],
        reits: [
          { id: "o", name: "Realty Income Corp", symbol: "O", price: 53.67, change: 0.24, changePercent: 0.45, volume: "5.3M", marketCap: "46.7B", riskScore: 40 },
          { id: "amt", name: "American Tower Corp", symbol: "AMT", price: 187.32, change: -2.18, changePercent: -1.15, volume: "2.1M", marketCap: "87.3B", riskScore: 50 },
          { id: "pld", name: "Prologis Inc", symbol: "PLD", price: 126.54, change: 0.87, changePercent: 0.69, volume: "3.2M", marketCap: "117.1B", riskScore: 45 }
        ],
        crypto: [
          { id: "btc", name: "Bitcoin", symbol: "BTC", price: 68423.05, change: 1258.67, changePercent: 1.88, volume: "28.4B", marketCap: "1.34T", riskScore: 80 },
          { id: "eth", name: "Ethereum", symbol: "ETH", price: 3586.24, change: 86.42, changePercent: 2.47, volume: "13.7B", marketCap: "431.1B", riskScore: 75 },
          { id: "sol", name: "Solana", symbol: "SOL", price: 143.28, change: -4.86, changePercent: -3.28, volume: "2.8B", marketCap: "62.8B", riskScore: 85 },
          { id: "ada", name: "Cardano", symbol: "ADA", price: 0.4658, change: 0.0128, changePercent: 2.82, volume: "584.3M", marketCap: "16.5B", riskScore: 80 },
          { id: "dot", name: "Polkadot", symbol: "DOT", price: 6.42, change: -0.18, changePercent: -2.73, volume: "327.8M", marketCap: "8.7B", riskScore: 90 }
        ],
        commodities: [
          { id: "gc", name: "Gold", symbol: "GC", price: 2386.40, change: 14.80, changePercent: 0.62, volume: "235.7K", marketCap: "N/A", riskScore: 40 },
          { id: "cl", name: "Crude Oil", symbol: "CL", price: 78.26, change: -1.14, changePercent: -1.44, volume: "452.3K", marketCap: "N/A", riskScore: 65 },
          { id: "si", name: "Silver", symbol: "SI", price: 27.85, change: 0.32, changePercent: 1.16, volume: "128.4K", marketCap: "N/A", riskScore: 55 }
        ],
        cds: [
          { id: "cd1y", name: "1-Year CD", symbol: "1YCD", price: 5.25, change: 0, changePercent: 0, volume: "N/A", marketCap: "N/A", riskScore: 15 },
          { id: "cd5y", name: "5-Year CD", symbol: "5YCD", price: 3.85, change: 0, changePercent: 0, volume: "N/A", marketCap: "N/A", riskScore: 20 }
        ],
        p2p: [
          { id: "lclub", name: "LendingClub", symbol: "LC", price: 8.43, change: -0.12, changePercent: -1.40, volume: "1.2M", marketCap: "921.3M", riskScore: 65 },
          { id: "upst", name: "Upstart Holdings", symbol: "UPST", price: 26.78, change: 0.87, changePercent: 3.36, volume: "5.4M", marketCap: "2.3B", riskScore: 75 }
        ],
        annuities: [
          { id: "fixedann", name: "Fixed Annuity Avg", symbol: "FXANN", price: 5.15, change: 0.05, changePercent: 0.98, volume: "N/A", marketCap: "N/A", riskScore: 30 },
          { id: "varann", name: "Variable Annuity Avg", symbol: "VARANN", price: 6.74, change: 0.12, changePercent: 1.81, volume: "N/A", marketCap: "N/A", riskScore: 45 }
        ],
        treasury: [
          { id: "t-bill1m", name: "1-Month T-Bill", symbol: "TB1M", price: 5.42, change: 0.01, changePercent: 0.18, volume: "N/A", marketCap: "N/A", riskScore: 10 },
          { id: "t-bill3m", name: "3-Month T-Bill", symbol: "TB3M", price: 5.38, change: 0.02, changePercent: 0.37, volume: "N/A", marketCap: "N/A", riskScore: 10 },
          { id: "tips", name: "TIPS", symbol: "TIPS", price: 98.75, change: 0.15, changePercent: 0.15, volume: "N/A", marketCap: "N/A", riskScore: 20 }
        ],
        savings: [
          { id: "hys", name: "High-Yield Savings Avg", symbol: "HYS", price: 5.05, change: 0, changePercent: 0, volume: "N/A", marketCap: "N/A", riskScore: 10 },
          { id: "mmf", name: "Money Market Fund Avg", symbol: "MMF", price: 5.18, change: 0.01, changePercent: 0.19, volume: "N/A", marketCap: "N/A", riskScore: 15 }
        ],
        collectibles: [
          { id: "wine", name: "Fine Wine Index", symbol: "WINE", price: 365.72, change: 2.34, changePercent: 0.64, volume: "N/A", marketCap: "N/A", riskScore: 70 },
          { id: "art", name: "Art Market Index", symbol: "ART", price: 1028.45, change: -3.24, changePercent: -0.31, volume: "N/A", marketCap: "N/A", riskScore: 75 }
        ],
        venture_capital: [
          { id: "vcix", name: "VC Early Stage Index", symbol: "VCIX", price: 285.34, change: 5.67, changePercent: 2.03, volume: "N/A", marketCap: "N/A", riskScore: 95 },
          { id: "vclx", name: "VC Late Stage Index", symbol: "VCLX", price: 173.26, change: -2.54, changePercent: -1.45, volume: "N/A", marketCap: "N/A", riskScore: 85 }
        ],
        forex: [
          { id: "eurusd", name: "EUR/USD", symbol: "EUR/USD", price: 1.0876, change: 0.0025, changePercent: 0.23, volume: "98.4B", marketCap: "N/A", riskScore: 50 },
          { id: "gbpusd", name: "GBP/USD", symbol: "GBP/USD", price: 1.2735, change: -0.0031, changePercent: -0.24, volume: "54.2B", marketCap: "N/A", riskScore: 55 },
          { id: "usdjpy", name: "USD/JPY", symbol: "USD/JPY", price: 151.42, change: 0.74, changePercent: 0.49, volume: "82.1B", marketCap: "N/A", riskScore: 60 }
        ],
        esg: [
          { id: "esgu", name: "iShares ESG Aware MSCI", symbol: "ESGU", price: 108.45, change: 0.67, changePercent: 0.62, volume: "1.2M", marketCap: "12.7B", riskScore: 40 },
          { id: "esgd", name: "iShares ESG MSCI EAFE", symbol: "ESGD", price: 78.32, change: -0.25, changePercent: -0.32, volume: "450K", marketCap: "7.2B", riskScore: 45 },
          { id: "snpe", name: "Xtrackers S&P 500 ESG", symbol: "SNPE", price: 45.36, change: 0.28, changePercent: 0.62, volume: "320K", marketCap: "1.8B", riskScore: 40 }
        ]
      });
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Market category descriptions for beginners
  const categoryDescriptions: Record<string, string> = {
    stocks: "Ownership shares in public companies. Suitable for long-term growth and sometimes provide dividend income.",
    bonds: "Fixed-income securities where investors lend money to an entity for a defined period at a fixed interest rate. Lower risk than stocks.",
    mutual_funds: "Pools of money from many investors that are professionally managed to invest in a variety of securities. Good for diversification.",
    index_funds: "Type of mutual fund that tracks a specific market index. Offers low fees and broad market exposure.",
    etfs: "Exchange-Traded Funds trade like stocks but hold assets like mutual funds. Typically have lower fees than mutual funds.",
    reits: "Real Estate Investment Trusts own and often operate income-producing real estate. Provide real estate exposure without direct ownership.",
    commodities: "Physical goods like gold, oil, and agricultural products. Often used as a hedge against inflation.",
    crypto: "Digital or virtual currencies that use cryptography for security. Highly volatile but with potential for significant returns.",
    cds: "Certificates of Deposit offer fixed interest rates for specific time periods. Low risk with predictable returns.",
    p2p: "Peer-to-Peer lending platforms connect borrowers with investors. Higher risk but potential for better returns than traditional fixed income.",
    annuities: "Insurance products that provide regular income streams, often for retirement. Can offer tax advantages and guaranteed income.",
    treasury: "Government-issued debt securities. Among the safest investments with lower returns.",
    savings: "High-yield savings accounts offer better interest rates than traditional accounts. Very low risk with FDIC insurance.",
    collectibles: "Unique physical items like art, wine, and antiques. Require expertise and may have limited liquidity.",
    venture_capital: "Investments in early-stage companies with high growth potential. Very high risk with potential for substantial returns.",
    forex: "Foreign exchange market where currencies are traded. Complex market typically more suitable for experienced traders.",
    esg: "Environmental, Social, and Governance funds focus on companies with positive impacts. Allow values-aligned investing."
  };

  // Category display names mapping
  const categoryDisplayNames: Record<string, string> = {
    stocks: "Stocks",
    bonds: "Bonds",
    mutual_funds: "Mutual Funds",
    index_funds: "Index Funds",
    etfs: "ETFs",
    reits: "REITs",
    commodities: "Commodities",
    crypto: "Cryptocurrency",
    cds: "CDs",
    p2p: "P2P Lending",
    annuities: "Annuities",
    treasury: "Treasury Securities",
    savings: "Savings",
    collectibles: "Collectibles",
    venture_capital: "Venture Capital",
    forex: "Forex",
    esg: "ESG Funds"
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Overview</CardTitle>
        <CardDescription>Real-time performance across asset classes</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="stocks">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4 overflow-auto">
            {Object.keys(categoryDisplayNames).map((category) => (
              <TabsTrigger key={category} value={category}>
                {categoryDisplayNames[category]}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {Object.keys(markets).map((category) => (
            <TabsContent key={category} value={category} className="space-y-4">
              {/* Beginner-friendly description */}
              <div className="bg-gray-800/50 rounded-lg p-3 mb-4 flex items-start gap-3">
                <HelpCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-sm text-gray-200 mb-1">About {categoryDisplayNames[category]}</h4>
                  <p className="text-xs text-gray-400">{categoryDescriptions[category]}</p>
                </div>
              </div>
              
              {isLoading ? (
                <div className="animate-pulse space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-12 bg-gray-800 rounded"></div>
                  ))}
                </div>
              ) : (
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 gap-2 p-3 text-muted-foreground text-sm font-medium">
                    <div className="col-span-3">Asset</div>
                    <div className="col-span-2 text-right">Price</div>
                    <div className="col-span-2 text-right">24h Change</div>
                    <div className="col-span-2 text-right hidden md:block">Volume</div>
                    <div className="col-span-2 text-right hidden md:block">Market Cap</div>
                    <div className="col-span-1 text-right">Risk</div>
                  </div>
                  
                  {markets[category]?.length > 0 ? (
                    markets[category].map((item) => (
                      <div key={item.id} className="grid grid-cols-12 gap-2 px-3 py-3 items-center border-t border-gray-800 hover:bg-gray-900 transition-colors">
                        <div className="col-span-3">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div>
                                  <div className="font-medium">{item.symbol}</div>
                                  <div className="text-xs text-muted-foreground">{item.name}</div>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent side="right">
                                <p className="text-sm">Ticker: {item.symbol}</p>
                                <p className="text-xs text-gray-400">Full name: {item.name}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <div className="col-span-2 text-right price-ticker">
                          {typeof convertCurrency === 'function' 
                            ? currencySymbol + convertCurrency(item.price)
                            : item.price.toLocaleString('en-US', { 
                                minimumFractionDigits: item.price < 1 ? 4 : 2,
                                maximumFractionDigits: item.price < 1 ? 4 : 2
                              })
                          }
                        </div>
                        <div className={`col-span-2 text-right ${item.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {item.change >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                        </div>
                        <div className="col-span-2 text-right hidden md:block">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger className="cursor-help">
                                {item.volume}
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">Trading volume in the last 24 hours</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <div className="col-span-2 text-right hidden md:block">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger className="cursor-help">
                                {item.marketCap}
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">Total market value of all shares</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <div className="col-span-1">
                          <RiskIndicator riskScore={item.riskScore} size="sm" />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-gray-500">
                      No data available for this market category
                    </div>
                  )}
                </div>
              )}
              
              {!isLoading && markets[category]?.length > 0 && (
                <PriceChart assetType={category} />
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
