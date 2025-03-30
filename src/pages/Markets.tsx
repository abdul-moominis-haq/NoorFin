import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Line, Bar } from "react-chartjs-2";
import "chart.js/auto";
import { financialData } from "../lib/data";

/**
 * Markets Component - Displays a financial dashboard with various asset classes
 * 
 * Features:
 * - View different asset classes (stocks, bonds, crypto, etc.)
 * - See price/yield trends over time
 * - View detailed data tables
 * - Read relevant market news
 */
const Markets = () => {
  // State for user selections
  const [selectedAssetClass, setSelectedAssetClass] = useState("stocks");
  const [timeRange, setTimeRange] = useState("7d");
  const [currency, setCurrency] = useState("USD");

  // Get top 10 items from the selected asset class
  const filteredData = financialData[selectedAssetClass as keyof typeof financialData]?.slice(0, 10) || [];

  /**
   * Generates chart data for the selected asset class
   * Handles both price-based and yield-based assets
   */
  const generateChartData = () => {
    const isYieldAsset = ['bonds', 'cds', 'treasuries'].includes(selectedAssetClass);

    return {
      labels: filteredData.map(item => item.symbol),
      datasets: [{
        label: selectedAssetClass.toUpperCase(),
        data: filteredData.map(item => isYieldAsset ? item.yield : item.price || item.nav),
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      }]
    };
  };

  /**
   * Generates 7 days of trend data for a given symbol
   * @param symbol - The asset symbol to generate data for
   */
  const generateTrendData = (symbol: string) => {
    const asset = filteredData.find(item => item.symbol === symbol);
    const baseValue = asset?.price || asset?.yield || 100;

    // Generate random but somewhat realistic price movements
    return Array(7).fill(0).map((_, i) => ({
      date: new Date(Date.now() - (6 - i) * 86400000).toLocaleDateString(),
      value: baseValue * (1 + (Math.random() * 0.1 - 0.05)) // Random change between -5% and +5%
    }));
  };

  // Get currency symbol based on selection
  const getCurrencySymbol = () => {
    const currencySymbols = { "USD": "$", "EUR": "€", "GBP": "£" };
    return currencySymbols[currency as keyof typeof currencySymbols] || "$";
  };

  // Check if current asset class displays yields instead of prices
  const isYieldAsset = ['bonds', 'cds', 'treasuries'].includes(selectedAssetClass);

  return (
    <div className="space-y-6 p-6 bg-gray-900 min-h-screen">
      {/* Header with title and controls */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Global Financial Dashboard</h1>
        <div className="flex gap-4">
          {/* Currency selector */}
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD ($)</SelectItem>
              <SelectItem value="EUR">EUR (€)</SelectItem>
              <SelectItem value="GBP">GBP (£)</SelectItem>
            </SelectContent>
          </Select>

          {/* Time range selector */}
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="1m">1 Month</SelectItem>
              <SelectItem value="3m">3 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main market data card */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Market Overview</CardTitle>
              <CardDescription>Real-time financial data across all asset classes</CardDescription>
            </div>

            {/* Asset class selector */}
            <Select value={selectedAssetClass} onValueChange={setSelectedAssetClass}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Asset Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stocks">Stocks</SelectItem>
                <SelectItem value="bonds">Bonds</SelectItem>
                <SelectItem value="cryptocurrencies">Cryptocurrencies</SelectItem>
                <SelectItem value="etfs">ETFs</SelectItem>
                <SelectItem value="commodities">Commodities</SelectItem>
                <SelectItem value="reits">REITs</SelectItem>
                <SelectItem value="forex">Forex</SelectItem>
                <SelectItem value="esgInvestments">ESG Investments</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          {/* Chart grid - Bar chart and line chart side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top assets bar chart */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Top {selectedAssetClass} by Market Value</h3>
              <Bar
                data={generateChartData()}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'top' },
                    tooltip: {
                      callbacks: {
                        label: (context) => {
                          const label = context.dataset.label ? `${context.dataset.label}: ` : '';
                          const value = isYieldAsset
                            ? `${context.raw}%`
                            : `${getCurrencySymbol()}${context.raw}`;
                          return label + value;
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: false,
                      ticks: {
                        callback: (value) => isYieldAsset
                          ? `${value}%`
                          : `${getCurrencySymbol()}${value}`
                      }
                    }
                  }
                }}
              />
            </div>

            {/* Price trends line chart */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Price Trends</h3>
              {filteredData.length > 0 && (
                <Line
                  data={{
                    labels: generateTrendData(filteredData[0].symbol).map(item => item.date),
                    datasets: filteredData.slice(0, 3).map((asset, i) => ({
                      label: asset.symbol,
                      data: generateTrendData(asset.symbol).map(item => item.value),
                      borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(75, 192, 192, 1)',
                      ][i],
                      backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                      ][i],
                      borderWidth: 2,
                      tension: 0.1,
                    })),
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: 'top' },
                      tooltip: {
                        callbacks: {
                          label: (context) => {
                            const label = context.dataset.label ? `${context.dataset.label}: ` : '';
                            const value = isYieldAsset
                              ? `${context.raw}%`
                              : `${getCurrencySymbol()}${context.raw.toFixed(2)}`;
                            return label + value;
                          }
                        }
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: false,
                        ticks: {
                          callback: (value) => isYieldAsset
                            ? `${value}%`
                            : `${getCurrencySymbol()}${value}`
                        }
                      }
                    }
                  }}
                />
              )}
            </div>
          </div>

          {/* Data table showing all filtered assets */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">{selectedAssetClass.toUpperCase()} Data Table</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="py-3 px-4 text-left">Symbol</th>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-right">
                      {isYieldAsset ? 'Yield' : 'Price'}
                    </th>
                    <th className="py-3 px-4 text-right">Change</th>
                    {selectedAssetClass === 'stocks' && <th className="py-3 px-4 text-right">P/E</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredData.map((item) => (
                    <tr key={item.symbol}>
                      <td className="py-3 px-4 font-medium">{item.symbol}</td>
                      <td className="py-3 px-4">{item.name}</td>
                      <td className="py-3 px-4 text-right">
                        {isYieldAsset
                          ? `${item.yield}%`
                          : `${getCurrencySymbol()}${item.price?.toFixed(2) || item.nav?.toFixed(2)}`}
                      </td>
                      <td className={`py-3 px-4 text-right ${item.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.change > 0 ? '+' : ''}{item.change}%
                      </td>
                      {selectedAssetClass === 'stocks' && (
                        <td className="py-3 px-4 text-right">{item.peRatio?.toFixed(2)}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market news card */}
      <Card>
        <CardHeader>
          <CardTitle>Market News</CardTitle>
          <CardDescription>Latest financial news affecting markets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {financialData.marketNews.slice(0, 5).map((news) => (
              <div key={news.id} className="p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="font-semibold text-lg">{news.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{news.content.substring(0, 150)}...</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">
                    {news.source} • {new Date(news.date).toLocaleDateString()}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs ${news.sentimentScore > 0.5 ? 'bg-green-100 text-green-800' :
                    news.sentimentScore < -0.5 ? 'bg-gray-700 text-white' :
                      'bg-gray-700 text-white'
                    }`}>
                    {news.sentimentScore > 0.5 ? 'Positive' :
                      news.sentimentScore < -0.5 ? 'Negative' : 'Neutral'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Markets;