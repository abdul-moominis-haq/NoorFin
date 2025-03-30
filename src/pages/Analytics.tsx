import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { financialData } from "../lib/data";
import { getChatGPTAnalysis } from '../lib/openai';

// Helper functions for NLP analysis
const analyzeSentiment = (newsItems: typeof financialData.marketNews) => {
  const positive = newsItems.filter(n => n.sentimentScore > 0.5).length;
  const negative = newsItems.filter(n => n.sentimentScore < -0.5).length;
  const neutral = newsItems.length - positive - negative;

  return {
    positivePercentage: Math.round((positive / newsItems.length) * 100),
    negativePercentage: Math.round((negative / newsItems.length) * 100),
    neutralPercentage: Math.round((neutral / newsItems.length) * 100),
    overallSentiment: positive > negative ? 'bullish' : negative > positive ? 'bearish' : 'neutral'
  };
};

const extractKeyThemes = (newsItems: typeof financialData.marketNews) => {
  const themes: Record<string, number> = {};

  newsItems.forEach(news => {
    news.categories.forEach(category => {
      themes[category] = (themes[category] || 0) + 1;
    });
  });

  return Object.entries(themes)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([theme, count]) => ({ theme, count }));
};

const generateRiskAssessment = () => {
  const cryptoVolatility = financialData.cryptocurrencies.reduce(
    (sum, crypto) => sum + Math.abs(crypto.change), 0) / financialData.cryptocurrencies.length;

  const stockVolatility = financialData.stocks.reduce(
    (sum, stock) => sum + Math.abs(stock.change), 0) / financialData.stocks.length;

  return {
    cryptoRisk: cryptoVolatility > 3 ? 'High' : cryptoVolatility > 1.5 ? 'Medium' : 'Low',
    marketRisk: stockVolatility > 2 ? 'Elevated' : 'Normal',
    bondSafety: financialData.bonds[0]?.yield > 4.5 ? 'Attractive' : 'Average'
  };
};

const LoadingSkeleton = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse ${className}`}>
    <div className="h-4 bg-gray-200 rounded mb-2"></div>
    <div className="h-4 bg-gray-200 rounded mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
  </div>
);

const Analytics = () => {
  // State for AI insights
  const [portfolioInsight, setPortfolioInsight] = useState('');
  const [marketAnalysis, setMarketAnalysis] = useState('');
  const [riskAssessmentInsight, setRiskAssessmentInsight] = useState('');
  const [loading, setLoading] = useState({
    portfolio: false,
    market: false,
    risk: false
  });
  const [error, setError] = useState({
    portfolio: null,
    market: null,
    risk: null
  });

  // NLP-processed data
  const sentimentAnalysis = analyzeSentiment(financialData.marketNews);
  const keyThemes = extractKeyThemes(financialData.marketNews);
  const riskAssessment = generateRiskAssessment();

  // Portfolio allocation data
  const allocationData = [
    { name: 'Stocks', value: 45 },
    { name: 'Bonds', value: 15 },
    { name: 'Real Estate', value: 10 },
    { name: 'Crypto', value: 15 },
    { name: 'Cash', value: 15 },
  ];

  // Sector analysis from stock data
  const sectorData = Object.entries(
    financialData.stocks.reduce((acc, stock) => {
      acc[stock.sector] = (acc[stock.sector] || 0) + (stock.marketCap || 0);
      return acc;
    }, {} as Record<string, number>)
  )
    .map(([name, value]) => ({ name, value: value / 1000 }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  // Performance metrics
  const performanceMetrics = [
    {
      name: "Market Sentiment",
      value: sentimentAnalysis.overallSentiment.toUpperCase(),
      trend: sentimentAnalysis.overallSentiment,
      subtitle: `${sentimentAnalysis.positivePercentage}% positive news`
    },
    {
      name: "Crypto Volatility",
      value: riskAssessment.cryptoRisk,
      trend: riskAssessment.cryptoRisk === 'High' ? 'negative' : 'positive',
      subtitle: "Based on 30-day changes"
    },
    {
      name: "Bond Yield Attractiveness",
      value: riskAssessment.bondSafety,
      trend: riskAssessment.bondSafety === 'Attractive' ? 'positive' : 'neutral',
      subtitle: "10-year Treasury yield"
    },
    {
      name: "Market Risk Level",
      value: riskAssessment.marketRisk,
      trend: riskAssessment.marketRisk === 'Elevated' ? 'negative' : 'positive',
      subtitle: "Equity market volatility"
    }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Generate AI insights
  useEffect(() => {
    const generateInsights = async () => {
      try {
        // Portfolio allocation insight
        setLoading(prev => ({ ...prev, portfolio: true }));
        const portfolioPrompt = `
          Portfolio Allocation:
          ${allocationData.map(item => `${item.name}: ${item.value}%`).join(', ')}
          
          Market Conditions:
          - Sentiment: ${sentimentAnalysis.overallSentiment}
          - Crypto Risk: ${riskAssessment.cryptoRisk}
          - Bond Attractiveness: ${riskAssessment.bondSafety}
          
          Provide 3 specific recommendations for portfolio adjustments with brief justifications.
          Format with clear headings and bullet points.
        `;
        const portfolioResponse = await getChatGPTAnalysis(portfolioPrompt);
        setPortfolioInsight(portfolioResponse);
        setLoading(prev => ({ ...prev, portfolio: false }));

        // Market analysis insight
        setLoading(prev => ({ ...prev, market: true }));
        const marketPrompt = `
          Market Trends:
          - Top Sectors: ${sectorData.slice(0, 3).map(s => `${s.name} ($${s.value.toFixed(1)}B)`).join(', ')}
          - News Sentiment: ${sentimentAnalysis.positivePercentage}% positive
          - Key Themes: ${keyThemes.slice(0, 3).map(t => `${t.theme} (${t.count}x)`).join(', ')}
          
          Identify 2 emerging opportunities and 1 potential risk with supporting evidence.
          Keep response concise and data-driven.
        `;
        const marketResponse = await getChatGPTAnalysis(marketPrompt);
        setMarketAnalysis(marketResponse);
        setLoading(prev => ({ ...prev, market: false }));

        // Risk assessment insight
        setLoading(prev => ({ ...prev, risk: true }));
        const riskPrompt = `
          Risk Factors:
          - Crypto Volatility: ${riskAssessment.cryptoRisk}
          - Market Risk: ${riskAssessment.marketRisk}
          - Bond Safety: ${riskAssessment.bondSafety}
          
          Suggest 3 specific hedging strategies appropriate for these conditions.
          Format with clear numbered recommendations.
        `;
        const riskResponse = await getChatGPTAnalysis(riskPrompt);
        setRiskAssessmentInsight(riskResponse);
        setLoading(prev => ({ ...prev, risk: false }));
      } catch (err) {
        console.error('Error generating insights:', err);
        setError({
          portfolio: 'Failed to generate portfolio insights',
          market: 'Failed to generate market analysis',
          risk: 'Failed to generate risk insights'
        });
        setLoading({
          portfolio: false,
          market: false,
          risk: false
        });
      }
    };

    generateInsights();
  }, []);

  // AI-enhanced components
  const insightsTabContent = (
    <div className="space-y-4">
      <div className="p-4  bg-gray-700 rounded-lg">
        <h3 className="font-medium text-white">AI Portfolio Recommendations</h3>
        {loading.portfolio ? (
          <LoadingSkeleton className="h-24" />
        ) : error.portfolio ? (
          <p className="text-sm text-red-500">{error.portfolio}</p>
        ) : (
          <div className="prose prose-sm text-blue-600 mt-1">
            {portfolioInsight.split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const sectorAnalysisInsight = (
    <div className="mt-4 p-4  bg-gray-700 rounded-lg">
      <h3 className="font-medium text-white">AI Market Analysis</h3>
      {loading.market ? (
        <LoadingSkeleton className="h-24" />
      ) : error.market ? (
        <p className="text-sm text-red-500">{error.market}</p>
      ) : (
        <div className="prose prose-sm text-purple-600 mt-1">
          {marketAnalysis.split('\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      )}
    </div>
  );

  const riskAssessmentWithAI = (
    <div className="space-y-4">
      <div className="p-3 bg-gray-700 border rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">Crypto Market</h3>
            <p className="text-xs text-white">Volatility risk</p>
          </div>
          <div className={`text-xl font-bold ${riskAssessment.cryptoRisk === 'High' ? 'text-red-500' :
            riskAssessment.cryptoRisk === 'Medium' ? 'text-yellow-500' :
              'text-green-500'
            }`}>
            {riskAssessment.cryptoRisk}
          </div>
        </div>
      </div>

      <div className="p-3 bg-gray-700 border rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">Equity Market</h3>
            <p className="text-xs text-white">Stability level</p>
          </div>
          <div className={`text-xl font-bold ${riskAssessment.marketRisk === 'Elevated' ? 'text-yellow-500' : 'text-green-500'
            }`}>
            {riskAssessment.marketRisk}
          </div>
        </div>
      </div>

      <div className="p-3 bg-gray-700 border rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">Fixed Income</h3>
            <p className="text-xs text-white">Yield attractiveness</p>
          </div>
          <div className={`text-xl font-bold ${riskAssessment.bondSafety === 'Attractive' ? 'text-green-500' : 'text-gray-500'
            }`}>
            {riskAssessment.bondSafety}
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-700 rounded-lg">
        <h3 className="font-medium text-red-800">AI Risk Mitigation Strategies</h3>
        {loading.risk ? (
          <LoadingSkeleton className="h-24" />
        ) : error.risk ? (
          <p className="text-sm text-red-500">{error.risk}</p>
        ) : (
          <div className="prose prose-sm text-red-600 mt-1">
            {riskAssessmentInsight.split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Advanced Analytics</h1>
          <p className="text-muted-foreground">
            AI-powered insights from market data and news sentiment
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Portfolio Allocation Card */}
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Allocation</CardTitle>
              <CardDescription>Current distribution across asset classes</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="chart">
                <TabsList className="mb-4">
                  <TabsTrigger value="chart">Chart View</TabsTrigger>
                  <TabsTrigger value="table">Table View</TabsTrigger>
                  <TabsTrigger value="insights">AI Insights</TabsTrigger>
                </TabsList>

                <TabsContent value="chart">
                  <div className="h-[350px] flex">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={allocationData}
                          cx="50%"
                          cy="50%"
                          innerRadius={80}
                          outerRadius={120}
                          fill="#8884d8"
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {allocationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value: number) => [`${value}%`, 'Allocation']}
                          contentStyle={{ backgroundColor: "#1E1E1E", borderColor: "#333" }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>

                <TabsContent value="table">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-3 gap-4 p-3 text-muted-foreground text-sm font-medium">
                      <div>Asset Class</div>
                      <div className="text-right">Allocation</div>
                      <div className="text-right">Recommended</div>
                    </div>

                    {allocationData.map((item, i) => (
                      <div key={i} className="grid grid-cols-3 gap-4 p-3 border-t items-center">
                        <div>{item.name}</div>
                        <div className="text-right">{item.value}%</div>
                        <div className="text-right">
                          {item.name === 'Stocks' && '40-60%'}
                          {item.name === 'Bonds' && '15-30%'}
                          {item.name === 'Real Estate' && '5-15%'}
                          {item.name === 'Crypto' && '0-10%'}
                          {item.name === 'Cash' && '5-20%'}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="insights">
                  {insightsTabContent}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Sector Analysis Card with NLP */}
          <Card>
            <CardHeader>
              <CardTitle>Sector Analysis</CardTitle>
              <CardDescription>Investment distribution with sentiment indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={sectorData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis
                      stroke="#6b7280"
                      tickFormatter={(value) => `$${value.toFixed(0)}B`}
                    />
                    <Tooltip
                      formatter={(value: number) => [`$${value}B`, 'Market Cap']}
                      contentStyle={{ backgroundColor: "#1E1E1E", borderColor: "#333" }}
                    />
                    <Legend />
                    <Bar
                      dataKey="value"
                      name="Market Capitalization"
                      fill="#8884d8"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {sectorAnalysisInsight}
            </CardContent>
          </Card>

          {/* News Sentiment Analysis Card */}
          <Card>
            <CardHeader>
              <CardTitle>News Sentiment Trends</CardTitle>
              <CardDescription>Market-moving news analysis over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={financialData.marketNews
                      .slice(0, 7)
                      .map(news => ({
                        date: new Date(news.date).toLocaleDateString(),
                        sentiment: news.sentimentScore * 100,
                        name: news.title.substring(0, 20) + '...'
                      }))}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="date" stroke="#6b7280" />
                    <YAxis
                      stroke="#6b7280"
                      domain={[-100, 100]}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip
                      formatter={(value: number) => [`${value}%`, 'Sentiment']}
                      labelFormatter={(label) => `Date: ${label}`}
                      contentStyle={{ backgroundColor: "#1E1E1E", borderColor: "#333" }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="sentiment"
                      name="Sentiment Score"
                      stroke="#8884d8"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4">
                <h3 className="font-medium">Key Market Themes</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {keyThemes.map((theme, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
                    >
                      {theme.theme} ({theme.count})
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right sidebar with insights */}
        <div className="space-y-6">
          {/* Risk Assessment Card */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment</CardTitle>
              <CardDescription>Current market risk profile</CardDescription>
            </CardHeader>
            <CardContent>
              {riskAssessmentWithAI}
            </CardContent>
          </Card>

          {/* Performance Metrics Card */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Key indicators with NLP context</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceMetrics.map((metric, i) => (
                  <div key={i} className="p-3 bg-gray-700 border rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{metric.name}</h3>
                        <p className="text-xs text-white">{metric.subtitle}</p>
                      </div>
                      <div className={`text-xl font-bold ${metric.trend === "positive" ? "text-green-500" :
                        metric.trend === "negative" ? "text-red-500" :
                          "text-gray-500"
                        }`}>
                        {metric.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* News Sentiment Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle>News Sentiment</CardTitle>
              <CardDescription>Market mood analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Positive', value: sentimentAnalysis.positivePercentage },
                        { name: 'Negative', value: sentimentAnalysis.negativePercentage },
                        { name: 'Neutral', value: sentimentAnalysis.neutralPercentage },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      <Cell fill="#10B981" />
                      <Cell fill="#EF4444" />
                      <Cell fill="#6B7280" />
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [`${value}%`, 'Sentiment']}
                      contentStyle={{ backgroundColor: "#1E1E1E", borderColor: "#333" }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 text-center text-sm text-gray-500">
                {sentimentAnalysis.overallSentiment === 'bullish' ? (
                  <p>Market sentiment is currently positive</p>
                ) : sentimentAnalysis.overallSentiment === 'bearish' ? (
                  <p>Market sentiment is currently negative</p>
                ) : (
                  <p>Market sentiment is mixed</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;