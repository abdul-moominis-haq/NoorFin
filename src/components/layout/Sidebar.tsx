
import { Home, BarChart3, PieChart, LineChart, Wallet, BookOpen, Settings, Users, BellRing } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: BarChart3, label: "Markets", href: "/markets" },
    { icon: PieChart, label: "Portfolio", href: "/portfolio" },
    { icon: LineChart, label: "Analytics", href: "/analytics" },
    { icon: Wallet, label: "Transactions", href: "/transactions" },
    { icon: BookOpen, label: "Learning", href: "/learning" },
    { icon: Users, label: "Community", href: "/community" },
    { icon: BellRing, label: "Alerts", href: "/alerts" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <div className={cn("pb-12 h-screen flex flex-col bg-sidebar", className)}>
      <div className="space-y-4 py-4 flex flex-col h-full">
        <div className="px-3 py-2">
          <div className="mb-8 px-4">
            <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-teal-400 text-transparent bg-clip-text">
              FinnovateAnalyzer
            </h2>
            <p className="text-xs text-muted-foreground pl-1">AI-Driven Financial Insights</p>
          </div>
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
              >
                <Button
                  variant={location.pathname === item.href ? "secondary" : "ghost"}
                  size="sm"
                  className={cn(
                    "w-full justify-start",
                    location.pathname === item.href && "bg-sidebar-accent text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-auto px-3 py-2">
          {/* <div className="rounded-lg bg-sidebar-accent p-3 text-sidebar-accent-foreground">
            <h3 className="font-medium text-sm mb-1">AI Advisor</h3>
            <p className="text-xs">Get AI-powered insights for your portfolio</p>
            <Button size="sm" className="mt-2 w-full bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90">
              Upgrade to Pro
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
