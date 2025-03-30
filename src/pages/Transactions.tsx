
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search, Plus } from "lucide-react";
import { useState } from "react";
import { QuickActions } from "@/components/dashboard/QuickActions";

const Transactions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const transactions = [
    { id: 1, type: "buy", asset: "AAPL", amount: 3, price: 183.58, date: "2023-04-15", total: 550.74, status: "completed" },
    { id: 2, type: "sell", asset: "NVDA", amount: 5, price: 925.15, date: "2023-04-10", total: 4625.75, status: "completed" },
    { id: 3, type: "buy", asset: "VTI", amount: 8, price: 258.75, date: "2023-04-05", total: 2070.00, status: "completed" },
    { id: 4, type: "dividend", asset: "MSFT", amount: null, price: null, date: "2023-04-01", total: 35.12, status: "completed" },
    { id: 5, type: "deposit", asset: null, amount: null, price: null, date: "2023-03-28", total: 5000.00, status: "completed" },
    { id: 6, type: "buy", asset: "BTC", amount: 0.05, price: 68423.05, date: "2023-03-25", total: 3421.15, status: "completed" },
    { id: 7, type: "buy", asset: "MSFT", amount: 2, price: 412.46, date: "2023-03-20", total: 824.92, status: "completed" },
    { id: 8, type: "withdraw", asset: null, amount: null, price: null, date: "2023-03-15", total: 1000.00, status: "completed" },
    { id: 9, type: "sell", asset: "TSLA", amount: 10, price: 194.05, date: "2023-03-10", total: 1940.50, status: "completed" },
    { id: 10, type: "buy", asset: "VXUS", amount: 25, price: 62.34, date: "2023-03-05", total: 1558.50, status: "completed" },
  ];
  
  const filteredTransactions = searchQuery 
    ? transactions.filter(tx => 
        tx.asset?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.date.includes(searchQuery) ||
        tx.total.toString().includes(searchQuery)
      )
    : transactions;
  
  const getTypeColor = (type: string) => {
    switch(type) {
      case "buy": return "bg-green-900/20 text-green-500 border-green-800";
      case "sell": return "bg-red-900/20 text-red-500 border-red-800";
      case "dividend": return "bg-blue-900/20 text-blue-500 border-blue-800";
      case "deposit": return "bg-purple-900/20 text-purple-500 border-purple-800";
      case "withdraw": return "bg-yellow-900/20 text-yellow-500 border-yellow-800";
      default: return "bg-gray-900/20 text-gray-500 border-gray-800";
    }
  };
  
  // Helper function to open the investment form
  const openInvestmentForm = () => {
    const quickActionsElement = document.querySelector('[data-action="add-investment"]');
    if (quickActionsElement instanceof HTMLElement) {
      quickActionsElement.click();
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">Record and manage your investment activities</p>
        </div>
        <Button onClick={openInvestmentForm}>
          <Plus className="mr-2 h-4 w-4" />
          New Transaction
        </Button>
      </div>
      
      <div className="hidden">
        <QuickActions />
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Complete record of your account activity</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search transactions..."
                  className="w-full sm:w-[200px] pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-2 p-3 text-muted-foreground text-sm font-medium">
              <div className="col-span-2">Date</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-2">Asset</div>
              <div className="col-span-2 text-right">Amount</div>
              <div className="col-span-2 text-right">Price</div>
              <div className="col-span-2 text-right">Total</div>
            </div>
            
            {filteredTransactions.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No transactions found
              </div>
            ) : (
              filteredTransactions.map((tx) => (
                <div key={tx.id} className="grid grid-cols-12 gap-2 p-3 border-t border-gray-800 hover:bg-gray-900 transition-colors">
                  <div className="col-span-2">{tx.date}</div>
                  <div className="col-span-2">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs ${getTypeColor(tx.type)}`}>
                      {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                    </span>
                  </div>
                  <div className="col-span-2">{tx.asset || "-"}</div>
                  <div className="col-span-2 text-right">{tx.amount !== null ? tx.amount : "-"}</div>
                  <div className="col-span-2 text-right">{tx.price !== null ? `$${tx.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : "-"}</div>
                  <div className="col-span-2 text-right font-medium">
                    {tx.type === "withdraw" ? "-" : ""}{tx.type === "deposit" ? "+" : ""}
                    ${tx.total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Transaction Summary</CardTitle>
            <CardDescription>Overview of recent account activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: "Total Deposits", value: "$12,500.00", change: "+$5,000.00 this month" },
                { label: "Total Withdrawals", value: "$3,000.00", change: "+$1,000.00 this month" },
                { label: "Net Cash Flow", value: "$9,500.00", change: "+$4,000.00 this month" },
                { label: "Buy Transactions", value: "12", change: "+5 this month" },
                { label: "Sell Transactions", value: "3", change: "+1 this month" }
              ].map((item, i) => (
                <div key={i} className="flex justify-between p-3 bg-gray-900 rounded-lg">
                  <div>
                    <h3 className="font-medium">{item.label}</h3>
                    <p className="text-xs text-gray-400">{item.change}</p>
                  </div>
                  <div className="text-xl font-bold">{item.value}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Transactions</CardTitle>
            <CardDescription>Scheduled investments and payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: "2023-04-25", description: "Scheduled deposit", amount: "$1,000.00" },
                { date: "2023-04-30", description: "Dividend payment (estimated)", amount: "$125.80" },
                { date: "2023-05-01", description: "Automatic investment - VTI", amount: "$500.00" }
              ].map((item, i) => (
                <div key={i} className="p-3 bg-gray-900 rounded-lg">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">{item.description}</h3>
                      <p className="text-xs text-gray-400">Scheduled for {item.date}</p>
                    </div>
                    <div className="text-xl font-bold">{item.amount}</div>
                  </div>
                </div>
              ))}
              
              <div className="p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
                <h3 className="font-medium text-blue-400 mb-2">Automatic Investment Plan</h3>
                <p className="text-sm text-gray-300 mb-4">
                  You have an active automatic investment plan that invests $500 in VTI on the 1st of each month.
                </p>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">Manage Plan</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Transactions;
