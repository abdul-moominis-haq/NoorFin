
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BellRing, Plus, Trash2, Settings, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const Alerts = () => {
  const [activeTab, setActiveTab] = useState("active");
  
  const activeAlerts = [
    { 
      id: 1, 
      type: "price", 
      asset: "AAPL", 
      condition: "above", 
      target: 190.00, 
      currentValue: 183.58,
      createdAt: "2023-04-01",
      triggered: false,
      enabled: true
    },
    { 
      id: 2, 
      type: "price", 
      asset: "BTC", 
      condition: "below", 
      target: 65000.00, 
      currentValue: 68423.05,
      createdAt: "2023-04-05",
      triggered: false,
      enabled: true
    },
    { 
      id: 3, 
      type: "volume", 
      asset: "NVDA", 
      condition: "above", 
      target: "100M", 
      currentValue: "57.3M",
      createdAt: "2023-04-08",
      triggered: false,
      enabled: true
    },
    { 
      id: 4, 
      type: "news", 
      asset: "TSLA", 
      condition: "mentions", 
      target: "earnings", 
      currentValue: "N/A",
      createdAt: "2023-04-10",
      triggered: false,
      enabled: true
    },
  ];
  
  const historicalAlerts = [
    { 
      id: 5, 
      type: "price", 
      asset: "MSFT", 
      condition: "above", 
      target: 400.00, 
      valueAtTrigger: 412.46,
      triggeredAt: "2023-03-28",
      triggered: true
    },
    { 
      id: 6, 
      type: "price", 
      asset: "AMZN", 
      condition: "below", 
      target: 170.00, 
      valueAtTrigger: 169.15,
      triggeredAt: "2023-03-25",
      triggered: true
    },
    { 
      id: 7, 
      type: "market", 
      asset: "S&P 500", 
      condition: "percent_change", 
      target: "-2%", 
      valueAtTrigger: "-2.3%",
      triggeredAt: "2023-03-15",
      triggered: true
    },
  ];
  
  const getConditionText = (condition: string) => {
    switch(condition) {
      case "above": return "rises above";
      case "below": return "falls below";
      case "percent_change": return "changes by";
      case "mentions": return "is mentioned with";
      default: return condition;
    }
  };
  
  const getTypeColor = (type: string) => {
    switch(type) {
      case "price": return "bg-blue-900/20 text-blue-500 border-blue-800";
      case "volume": return "bg-purple-900/20 text-purple-500 border-purple-800";
      case "news": return "bg-yellow-900/20 text-yellow-500 border-yellow-800";
      case "market": return "bg-green-900/20 text-green-500 border-green-800";
      default: return "bg-gray-900/20 text-gray-500 border-gray-800";
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Alerts</h1>
          <p className="text-muted-foreground">Stay informed about market changes</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Alert
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Alerts</CardTitle>
              <CardDescription>Monitor price movements and market events</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                
                <TabsContent value="active" className="space-y-4">
                  {activeAlerts.length === 0 ? (
                    <div className="p-8 text-center">
                      <BellRing className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                      <h3 className="text-lg font-medium mb-2">No active alerts</h3>
                      <p className="text-gray-400 mb-4">
                        Create your first alert to stay informed about market movements
                      </p>
                      <Button>Create Alert</Button>
                    </div>
                  ) : (
                    activeAlerts.map((alert) => (
                      <div key={alert.id} className="border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-2">
                            <Badge className={getTypeColor(alert.type)}>
                              {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                            </Badge>
                            <span className="text-xs text-gray-400">Created on {alert.createdAt}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Switch checked={alert.enabled} />
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                        
                        <h3 className="font-medium text-lg mb-1">{alert.asset}</h3>
                        <p className="text-sm text-gray-300 mb-3">
                          Alert when {alert.asset} {getConditionText(alert.condition)} {alert.target}
                        </p>
                        
                        <div className="flex justify-between items-center text-sm bg-gray-900 p-2 rounded-md">
                          <span>Current value: {typeof alert.currentValue === 'number' ? 
                            alert.currentValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : 
                            alert.currentValue}
                          </span>
                          <span>Target: {typeof alert.target === 'number' ? 
                            alert.target.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : 
                            alert.target}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </TabsContent>
                
                <TabsContent value="history" className="space-y-4">
                  {historicalAlerts.length === 0 ? (
                    <div className="p-8 text-center">
                      <Info className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                      <h3 className="text-lg font-medium mb-2">No alert history</h3>
                      <p className="text-gray-400">
                        Triggered alerts will appear here
                      </p>
                    </div>
                  ) : (
                    historicalAlerts.map((alert) => (
                      <div key={alert.id} className="border border-gray-800 rounded-lg p-4 bg-gray-900">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-2">
                            <Badge className={getTypeColor(alert.type)}>
                              {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                            </Badge>
                            <Badge variant="outline" className="bg-green-900/20 text-green-500 border-green-800">
                              Triggered
                            </Badge>
                          </div>
                          <span className="text-xs text-gray-400">Triggered on {alert.triggeredAt}</span>
                        </div>
                        
                        <h3 className="font-medium text-lg mb-1">{alert.asset}</h3>
                        <p className="text-sm text-gray-300 mb-3">
                          Alerted when {alert.asset} {getConditionText(alert.condition)} {alert.target}
                        </p>
                        
                        <div className="flex justify-between items-center text-sm bg-gray-800 p-2 rounded-md">
                          <span>Value at trigger: {typeof alert.valueAtTrigger === 'number' ? 
                            alert.valueAtTrigger.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : 
                            alert.valueAtTrigger}
                          </span>
                          <span>Target: {typeof alert.target === 'number' ? 
                            alert.target.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : 
                            alert.target}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create Alert</CardTitle>
              <CardDescription>Set up notifications for market events</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Alert Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Price", "Volume", "News", "Market"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <input type="radio" id={type.toLowerCase()} name="alertType" className="radio" />
                        <label htmlFor={type.toLowerCase()} className="text-sm">{type}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Asset</label>
                  <Input type="text" placeholder="Enter ticker symbol (e.g. AAPL)" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Condition</label>
                    <select className="w-full border border-gray-800 bg-gray-900 rounded-md p-2 text-sm">
                      <option>Above</option>
                      <option>Below</option>
                      <option>Percent Change</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Value</label>
                    <Input type="text" placeholder="Enter value" />
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button className="w-full">Create Alert</Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { label: "Push Notifications", description: "Receive alerts on your device", enabled: true },
                  { label: "Email Notifications", description: "Get alerts sent to your email", enabled: true },
                  { label: "SMS Notifications", description: "Receive text messages for alerts", enabled: false },
                  { label: "Alert Sound", description: "Play sound when alert is triggered", enabled: true },
                ].map((setting, i) => (
                  <div key={i} className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{setting.label}</h4>
                      <p className="text-sm text-gray-400">{setting.description}</p>
                    </div>
                    <Switch checked={setting.enabled} />
                  </div>
                ))}
                
                <div className="pt-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Advanced Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
