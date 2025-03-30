
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  PlusCircle, 
  BarChart3, 
  CircleDollarSign, 
  BookOpen, 
  X 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const investmentFormSchema = z.object({
  assetType: z.string().min(1, "Asset type is required"),
  symbol: z.string().min(1, "Symbol is required"),
  amount: z.coerce.number().positive("Amount must be positive"),
  price: z.coerce.number().positive("Price must be positive"),
  date: z.string().min(1, "Date is required"),
});

type InvestmentFormValues = z.infer<typeof investmentFormSchema>;

export function QuickActions() {
  const navigate = useNavigate();
  const [showInvestmentForm, setShowInvestmentForm] = useState(false);
  
  const form = useForm<InvestmentFormValues>({
    resolver: zodResolver(investmentFormSchema),
    defaultValues: {
      assetType: "",
      symbol: "",
      amount: 0,
      price: 0,
      date: new Date().toISOString().substring(0, 10),
    },
  });

  const handleAction = (action: string) => {
    switch (action) {
      case "add-investment":
        setShowInvestmentForm(true);
        break;
      case "trade":
        toast.success("Trade action initiated", {
          description: "Opening trading interface"
        });
        navigate("/portfolio");
        break;
      case "analytics":
        navigate("/analytics");
        break;
      case "watchlist":
        toast.success("Watchlist opened", {
          description: "Opening your personalized watchlist"
        });
        navigate("/markets");
        break;
      case "learn":
        navigate("/learning");
        break;
      default:
        break;
    }
  };

  const onSubmit = (data: InvestmentFormValues) => {
    toast.success("Investment added successfully", {
      description: `Added ${data.amount} shares of ${data.symbol} at $${data.price} per share`
    });
    setShowInvestmentForm(false);
    form.reset();
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
          <CardDescription>Shortcuts to common tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            <Button 
              variant="outline" 
              className="h-auto flex flex-col items-center justify-center py-4 space-y-2"
              onClick={() => handleAction("add-investment")}
            >
              <PlusCircle className="h-6 w-6 text-blue-500" />
              <span className="text-xs font-normal">Add Investment</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto flex flex-col items-center justify-center py-4 space-y-2"
              onClick={() => handleAction("trade")}
            >
              <TrendingUp className="h-6 w-6 text-green-500" />
              <span className="text-xs font-normal">Trade</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto flex flex-col items-center justify-center py-4 space-y-2"
              onClick={() => handleAction("analytics")}
            >
              <BarChart3 className="h-6 w-6 text-purple-500" />
              <span className="text-xs font-normal">Analytics</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto flex flex-col items-center justify-center py-4 space-y-2"
              onClick={() => handleAction("watchlist")}
            >
              <CircleDollarSign className="h-6 w-6 text-yellow-500" />
              <span className="text-xs font-normal">Watchlist</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto flex flex-col items-center justify-center py-4 space-y-2 md:col-span-1 col-span-2"
              onClick={() => handleAction("learn")}
            >
              <BookOpen className="h-6 w-6 text-blue-400" />
              <span className="text-xs font-normal">Learn</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showInvestmentForm} onOpenChange={setShowInvestmentForm}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Investment</DialogTitle>
            <DialogDescription>
              Enter the details of your investment below
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="assetType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asset Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select asset type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="stock">Stock</SelectItem>
                        <SelectItem value="etf">ETF</SelectItem>
                        <SelectItem value="bond">Bond</SelectItem>
                        <SelectItem value="crypto">Cryptocurrency</SelectItem>
                        <SelectItem value="reit">REIT</SelectItem>
                        <SelectItem value="commodity">Commodity</SelectItem>
                        <SelectItem value="mutualfund">Mutual Fund</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="symbol"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Symbol/Ticker</FormLabel>
                    <FormControl>
                      <Input placeholder="AAPL" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the trading symbol (e.g., AAPL for Apple Inc.)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price Per Unit</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaction Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Add Investment</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
