import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Button } from "@/components/ui/button";
import { Plus, Download, Filter, ArrowRight, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { RiskIndicator } from "@/components/dashboard/RiskIndicator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Types
type FinancialSituation = {
  emergencyFund: 'none' | 'partial' | 'full';
  debtType: 'none' | 'low' | 'high' | 'other';
  debtAmount?: number;
  cashFlow: 'positive' | 'neutral' | 'negative';
  employment: 'stable' | 'variable' | 'retired' | 'other';
  dependents: 'single' | 'partnered' | 'children' | 'elderly' | 'none';
};

type InvestmentPreference = {
  riskTolerance: 'low' | 'medium' | 'high';
  investmentGoal: 'retirement' | 'wealth' | 'income' | 'savings' | 'other';
  timeHorizon: number;
  initialAmount: number;
  monthlyContribution: number;
  assetComfort: {
    stocks: boolean;
    bonds: boolean;
    realEstate: boolean;
    crypto: boolean;
    metals: boolean;
    other?: string;
  };
  involvement: 'automated' | 'guided' | 'self-directed';
  taxNeeds: 'high' | 'maximized' | 'none';
  ethical: boolean;
};

type AssetAllocation = {
  stocks: number;
  bonds: number;
  realEstate: number;
  crypto: number;
  cash: number;
};

type InvestmentOption = {
  id: string;
  name: string;
  type: 'stock' | 'etf' | 'crypto' | 'bond' | 'reit' | 'metal';
  riskLevel: 'low' | 'medium' | 'high';
  expectedReturn: number;
  description: string;
  allocationPercentage: number;
  ethical: boolean;
};

type PortfolioData = {
  financialSituation: FinancialSituation;
  investmentPref: InvestmentPreference;
  selectedInvestments: Record<string, boolean>;
  completedOnboarding: boolean;
};

const STORAGE_KEY = 'portfolioAppData';

const Portfolio = () => {
  // Initialize state with default values or from localStorage
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : {
      financialSituation: {
        emergencyFund: 'none',
        debtType: 'none',
        cashFlow: 'neutral',
        employment: 'stable',
        dependents: 'none'
      },
      investmentPref: {
        riskTolerance: 'medium',
        investmentGoal: 'wealth',
        timeHorizon: 10,
        initialAmount: 10000,
        monthlyContribution: 500,
        assetComfort: {
          stocks: true,
          bonds: true,
          realEstate: true,
          crypto: false,
          metals: false
        },
        involvement: 'guided',
        taxNeeds: 'none',
        ethical: false
      },
      selectedInvestments: {},
      completedOnboarding: false
    };
  });

  // Destructure state for easier access
  const { financialSituation, investmentPref, selectedInvestments, completedOnboarding } = portfolioData;

  // Derived states
  const [portfolioHistory, setPortfolioHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(!completedOnboarding);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [assetAllocation, setAssetAllocation] = useState<AssetAllocation>({
    stocks: 0,
    bonds: 0,
    realEstate: 0,
    crypto: 0,
    cash: 0
  });
  const [recommendedInvestments, setRecommendedInvestments] = useState<InvestmentOption[]>([]);

  // Save to localStorage whenever portfolioData changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolioData));
  }, [portfolioData]);

  // Generate dummy portfolio data based on user preferences
  useEffect(() => {
    if (!showOnboarding) {
      setIsLoading(true);
      setTimeout(() => {
        const volatilityFactor = financialSituation.emergencyFund === 'full' ? 1.2 : 0.8;
        const volatility = investmentPref.riskTolerance === 'high' ? 0.3 * volatilityFactor :
          investmentPref.riskTolerance === 'medium' ? 0.2 * volatilityFactor : 0.1 * volatilityFactor;

        const data = Array.from({ length: 12 }, (_, i) => {
          const month = new Date(2025, i, 1);
          return {
            month: month.toLocaleString('default', { month: 'short' }),
            value: investmentPref.initialAmount +
              (investmentPref.monthlyContribution * i) +
              (Math.random() * volatility * investmentPref.initialAmount * i / 2),
            benchmark: investmentPref.initialAmount +
              (investmentPref.monthlyContribution * i) +
              (Math.random() * 0.15 * investmentPref.initialAmount * i / 2),
          };
        });

        setPortfolioHistory(data);
        setIsLoading(false);
      }, 1000);
    }
  }, [showOnboarding, investmentPref, financialSituation]);

  // Generate recommended asset allocation
  const generateAssetAllocation = () => {
    let allocation: AssetAllocation;

    switch (investmentPref.riskTolerance) {
      case 'high':
        allocation = { stocks: 60, bonds: 10, realEstate: 15, crypto: 10, cash: 5 };
        break;
      case 'medium':
        allocation = { stocks: 50, bonds: 20, realEstate: 10, crypto: 5, cash: 15 };
        break;
      case 'low':
      default:
        allocation = { stocks: 30, bonds: 40, realEstate: 5, crypto: 0, cash: 25 };
    }

    // Adjust for time horizon
    if (investmentPref.timeHorizon < 5) {
      allocation.stocks -= 10;
      allocation.bonds += 5;
      allocation.cash += 5;
    } else if (investmentPref.timeHorizon > 15) {
      allocation.stocks += 10;
      allocation.bonds -= 5;
      allocation.cash -= 5;
    }

    // Adjust for financial situation
    if (financialSituation.emergencyFund === 'none') {
      allocation.cash += 10;
      allocation.stocks -= 5;
      allocation.bonds -= 5;
    }

    if (financialSituation.debtType === 'high') {
      allocation.stocks -= 10;
      allocation.bonds += 5;
      allocation.cash += 5;
    }

    if (financialSituation.dependents === 'children' || financialSituation.dependents === 'elderly') {
      allocation.stocks -= 5;
      allocation.bonds += 5;
    }

    // Ensure no negative values and normalize to 100%
    allocation.stocks = Math.max(0, allocation.stocks);
    allocation.bonds = Math.max(0, allocation.bonds);
    allocation.realEstate = Math.max(0, allocation.realEstate);
    allocation.crypto = Math.max(0, allocation.crypto);
    allocation.cash = Math.max(0, allocation.cash);

    const total = allocation.stocks + allocation.bonds + allocation.realEstate + allocation.crypto + allocation.cash;
    if (total !== 100) {
      const factor = 100 / total;
      allocation.stocks = Math.round(allocation.stocks * factor);
      allocation.bonds = Math.round(allocation.bonds * factor);
      allocation.realEstate = Math.round(allocation.realEstate * factor);
      allocation.crypto = Math.round(allocation.crypto * factor);
      allocation.cash = Math.round(allocation.cash * factor);
    }

    setAssetAllocation(allocation);
    return allocation;
  };

  // Generate recommended investments
  const generateRecommendedInvestments = (allocation: AssetAllocation) => {
    const investments: InvestmentOption[] = [];

    if (investmentPref.assetComfort.stocks) {
      investments.push(
        {
          id: 'vti', name: 'VTI (Total Stock Market)', type: 'etf', riskLevel: 'medium',
          expectedReturn: 7.5, description: 'Diversified exposure to the entire US stock market',
          allocationPercentage: allocation.stocks * 0.6, ethical: false
        },
        {
          id: 'vxus', name: 'VXUS (International Stocks)', type: 'etf', riskLevel: 'medium',
          expectedReturn: 6.5, description: 'International stock market exposure',
          allocationPercentage: allocation.stocks * 0.4, ethical: false
        }
      );

      if (investmentPref.ethical) {
        investments.push({
          id: 'esgv', name: 'ESGV (ESG US Stock ETF)', type: 'etf', riskLevel: 'medium',
          expectedReturn: 7.0, description: 'ESG-focused US stock market exposure',
          allocationPercentage: allocation.stocks * 0.3, ethical: true
        });
      }
    }

    if (investmentPref.assetComfort.bonds) {
      investments.push(
        {
          id: 'bnd', name: 'BND (Total Bond Market)', type: 'bond', riskLevel: 'low',
          expectedReturn: 3.5, description: 'Diversified exposure to US bonds',
          allocationPercentage: allocation.bonds * 0.7, ethical: false
        },
        {
          id: 'tips', name: 'TIP (Treasury Inflation-Protected)', type: 'bond', riskLevel: 'low',
          expectedReturn: 2.5, description: 'Protection against inflation',
          allocationPercentage: allocation.bonds * 0.3, ethical: false
        }
      );
    }

    if (investmentPref.assetComfort.realEstate) {
      investments.push({
        id: 'vnq', name: 'VNQ (Real Estate ETF)', type: 'reit', riskLevel: 'medium',
        expectedReturn: 5.5, description: 'Diversified real estate investment trust',
        allocationPercentage: allocation.realEstate, ethical: false
      });
    }

    if (investmentPref.assetComfort.crypto && allocation.crypto > 0) {
      investments.push(
        {
          id: 'btc', name: 'Bitcoin', type: 'crypto', riskLevel: 'high',
          expectedReturn: 10, description: 'Digital cryptocurrency with high volatility',
          allocationPercentage: allocation.crypto * 0.6, ethical: false
        },
        {
          id: 'eth', name: 'Ethereum', type: 'crypto', riskLevel: 'high',
          expectedReturn: 8, description: 'Blockchain platform with smart contracts',
          allocationPercentage: allocation.crypto * 0.4, ethical: false
        }
      );
    }

    investments.push({
      id: 'money-market', name: 'Money Market Fund', type: 'bond', riskLevel: 'low',
      expectedReturn: 1.5, description: 'Low-risk cash equivalent',
      allocationPercentage: allocation.cash, ethical: false
    });

    // Adjust allocations
    const totalAllocation = investments.reduce((sum, inv) => sum + inv.allocationPercentage, 0);
    if (totalAllocation !== 100) {
      const factor = 100 / totalAllocation;
      investments.forEach(inv => {
        inv.allocationPercentage = Math.round(inv.allocationPercentage * factor * 10) / 10;
      });
    }

    return investments;
  };

  // Handle onboarding step progression
  const handleNextStep = () => {
    if (onboardingStep === 4) {
      const allocation = generateAssetAllocation();
      const investments = generateRecommendedInvestments(allocation);
      setRecommendedInvestments(investments);
      setShowOnboarding(false);
      setPortfolioData(prev => ({
        ...prev,
        completedOnboarding: true
      }));
    } else {
      setOnboardingStep(onboardingStep + 1);
    }
  };

  const handlePrevStep = () => {
    setOnboardingStep(Math.max(1, onboardingStep - 1));
  };

  // Handle investment selection
  const toggleInvestmentSelection = (id: string) => {
    setPortfolioData(prev => ({
      ...prev,
      selectedInvestments: {
        ...prev.selectedInvestments,
        [id]: !prev.selectedInvestments[id]
      }
    }));
  };

  // Handle reset
  const handleReset = () => {
    if (confirm('Are you sure you want to reset all your data? This cannot be undone.')) {
      localStorage.removeItem(STORAGE_KEY);
      setPortfolioData({
        financialSituation: {
          emergencyFund: 'none',
          debtType: 'none',
          cashFlow: 'neutral',
          employment: 'stable',
          dependents: 'none'
        },
        investmentPref: {
          riskTolerance: 'medium',
          investmentGoal: 'wealth',
          timeHorizon: 10,
          initialAmount: 10000,
          monthlyContribution: 500,
          assetComfort: {
            stocks: true,
            bonds: true,
            realEstate: true,
            crypto: false,
            metals: false
          },
          involvement: 'guided',
          taxNeeds: 'none',
          ethical: false
        },
        selectedInvestments: {},
        completedOnboarding: false
      });
      setShowOnboarding(true);
      setOnboardingStep(1);
    }
  };

  // Update state helpers
  const updateFinancialSituation = (data: Partial<FinancialSituation>) => {
    setPortfolioData(prev => ({
      ...prev,
      financialSituation: {
        ...prev.financialSituation,
        ...data
      }
    }));
  };

  const updateInvestmentPref = (data: Partial<InvestmentPreference>) => {
    setPortfolioData(prev => ({
      ...prev,
      investmentPref: {
        ...prev.investmentPref,
        ...data
      }
    }));
  };

  // Onboarding steps
  const renderOnboardingStep = () => {
    switch (onboardingStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Financial Situation Assessment</h2>
              <p className="text-muted-foreground">
                Let's understand your current financial position.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Emergency Fund Status</Label>
                <RadioGroup
                  value={financialSituation.emergencyFund}
                  onValueChange={(value) => updateFinancialSituation({ emergencyFund: value as any })}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="ef-none" />
                    <Label htmlFor="ef-none">No emergency fund</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="partial" id="ef-partial" />
                    <Label htmlFor="ef-partial">Partial (1-5 months expenses)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="full" id="ef-full" />
                    <Label htmlFor="ef-full">Fully funded (6+ months)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Current Debt Situation</Label>
                <RadioGroup
                  value={financialSituation.debtType}
                  onValueChange={(value) => updateFinancialSituation({ debtType: value as any })}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="debt-none" />
                    <Label htmlFor="debt-none">No debt</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="debt-low" />
                    <Label htmlFor="debt-low">Low-interest debt (mortgage/student loans)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="debt-high" />
                    <Label htmlFor="debt-high">High-interest debt (credit cards)</Label>
                  </div>
                </RadioGroup>
                {financialSituation.debtType === 'high' && (
                  <div className="mt-2">
                    <Label htmlFor="debtAmount">Approximate Debt Amount ($)</Label>
                    <Input
                      id="debtAmount"
                      type="number"
                      value={financialSituation.debtAmount || 0}
                      onChange={(e) => updateFinancialSituation({ debtAmount: parseInt(e.target.value) || 0 })}
                      min="0"
                    />
                  </div>
                )}
              </div>

              <div>
                <Label>Monthly Cash Flow</Label>
                <RadioGroup
                  value={financialSituation.cashFlow}
                  onValueChange={(value) => updateFinancialSituation({ cashFlow: value as any })}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="positive" id="flow-positive" />
                    <Label htmlFor="flow-positive">Positive (I save regularly)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="neutral" id="flow-neutral" />
                    <Label htmlFor="flow-neutral">Neutral (income ≈ expenses)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="negative" id="flow-negative" />
                    <Label htmlFor="flow-negative">Negative (relying on credit)</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Personal Situation</h2>
              <p className="text-muted-foreground">
                Tell us about your employment and family situation.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Employment Stability</Label>
                <RadioGroup
                  value={financialSituation.employment}
                  onValueChange={(value) => updateFinancialSituation({ employment: value as any })}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="stable" id="emp-stable" />
                    <Label htmlFor="emp-stable">Stable salaried position</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="variable" id="emp-variable" />
                    <Label htmlFor="emp-variable">Variable income (freelance/commission)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="retired" id="emp-retired" />
                    <Label htmlFor="emp-retired">Retired</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Dependents</Label>
                <RadioGroup
                  value={financialSituation.dependents}
                  onValueChange={(value) => updateFinancialSituation({ dependents: value as any })}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="single" id="dep-single" />
                    <Label htmlFor="dep-single">Single, no dependents</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="partnered" id="dep-partnered" />
                    <Label htmlFor="dep-partnered">Married/partnered</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="children" id="dep-children" />
                    <Label htmlFor="dep-children">Supporting children</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="elderly" id="dep-elderly" />
                    <Label htmlFor="dep-elderly">Caring for elderly parents</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="dep-none" />
                    <Label htmlFor="dep-none">None</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Investment Goals</h2>
              <p className="text-muted-foreground">
                What are you trying to achieve with your investments?
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="investmentGoal">Primary Investment Goal</Label>
                <Select
                  value={investmentPref.investmentGoal}
                  onValueChange={(value) => updateInvestmentPref({ investmentGoal: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select investment goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retirement">Retirement</SelectItem>
                    <SelectItem value="wealth">Wealth Building</SelectItem>
                    <SelectItem value="income">Passive Income</SelectItem>
                    <SelectItem value="savings">Capital Preservation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="timeHorizon">Investment Time Horizon (Years)</Label>
                <Input
                  type="number"
                  value={investmentPref.timeHorizon}
                  onChange={(e) => updateInvestmentPref({ timeHorizon: parseInt(e.target.value) || 0 })}
                  min="1"
                  max="50"
                />
              </div>

              <div>
                <Label>Risk Tolerance</Label>
                <RadioGroup
                  value={investmentPref.riskTolerance}
                  onValueChange={(value) => updateInvestmentPref({ riskTolerance: value as any })}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="risk-low" />
                    <Label htmlFor="risk-low">Conservative (0-20% fluctuation acceptable)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="risk-medium" />
                    <Label htmlFor="risk-medium">Moderate (20-40% fluctuation acceptable)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="risk-high" />
                    <Label htmlFor="risk-high">Aggressive (40%+ fluctuation acceptable)</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Investment Preferences</h2>
              <p className="text-muted-foreground">
                Customize your investment approach.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Asset Class Preferences</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {['stocks', 'bonds', 'realEstate', 'crypto', 'metals'].map((asset) => (
                    <div key={asset} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`asset-${asset}`}
                        checked={investmentPref.assetComfort[asset as keyof typeof investmentPref.assetComfort]}
                        onChange={(e) => updateInvestmentPref({
                          assetComfort: {
                            ...investmentPref.assetComfort,
                            [asset]: e.target.checked
                          }
                        })}
                        className="h-4 w-4"
                      />
                      <Label htmlFor={`asset-${asset}`}>{asset === 'realEstate' ? 'Real Estate' : asset.charAt(0).toUpperCase() + asset.slice(1)}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Preferred Involvement Level</Label>
                <RadioGroup
                  value={investmentPref.involvement}
                  onValueChange={(value) => updateInvestmentPref({ involvement: value as any })}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="automated" id="inv-auto" />
                    <Label htmlFor="inv-auto">Fully automated (robo-advisor)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="guided" id="inv-guided" />
                    <Label htmlFor="inv-guided">Guided investing (advisor-assisted)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="self-directed" id="inv-self" />
                    <Label htmlFor="inv-self">Self-directed (I make all decisions)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Tax Optimization Needs</Label>
                <RadioGroup
                  value={investmentPref.taxNeeds}
                  onValueChange={(value) => updateInvestmentPref({ taxNeeds: value as any })}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="tax-high" />
                    <Label htmlFor="tax-high">High tax bracket (needs tax-efficient investing)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="maximized" id="tax-max" />
                    <Label htmlFor="tax-max">Tax-advantaged accounts already maximized</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="tax-none" />
                    <Label htmlFor="tax-none">No special considerations</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Ethical Investing Preferences</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    id="ethical"
                    checked={investmentPref.ethical}
                    onChange={(e) => updateInvestmentPref({ ethical: e.target.checked })}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="ethical">I prefer ESG/SRI (socially responsible) investments</Label>
                </div>
              </div>

              <div>
                <Label htmlFor="initialAmount">Initial Investment Amount ($)</Label>
                <Input
                  type="number"
                  value={investmentPref.initialAmount}
                  onChange={(e) => updateInvestmentPref({ initialAmount: parseInt(e.target.value) || 0 })}
                  min="100"
                  step="100"
                />
              </div>

              <div>
                <Label htmlFor="monthlyContribution">Monthly Contribution ($)</Label>
                <Input
                  type="number"
                  value={investmentPref.monthlyContribution}
                  onChange={(e) => updateInvestmentPref({ monthlyContribution: parseInt(e.target.value) || 0 })}
                  min="0"
                  step="50"
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Calculate total selected allocation
  const totalSelectedAllocation = recommendedInvestments
    .filter(inv => selectedInvestments[inv.id])
    .reduce((sum, inv) => sum + inv.allocationPercentage, 0);

  // Calculate projected value
  const calculateProjectedValue = () => {
    const years = investmentPref.timeHorizon;
    const initial = investmentPref.initialAmount;
    const monthly = investmentPref.monthlyContribution;

    let baseRate = 0.04; // conservative
    if (investmentPref.riskTolerance === 'medium') baseRate = 0.06;
    if (investmentPref.riskTolerance === 'high') baseRate = 0.08;

    if (financialSituation.emergencyFund === 'full') baseRate += 0.005;
    if (financialSituation.debtType === 'high') baseRate -= 0.01;
    if (financialSituation.employment === 'variable') baseRate -= 0.005;

    let total = initial;
    for (let i = 0; i < years; i++) {
      total = total * (1 + baseRate) + (monthly * 12);
    }

    return Math.round(total);
  };

  if (showOnboarding) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Portfolio Setup</CardTitle>
            <CardDescription>
              Step {onboardingStep} of 4 - {
                onboardingStep === 1 ? 'Financial Situation' :
                  onboardingStep === 2 ? 'Personal Situation' :
                    onboardingStep === 3 ? 'Investment Goals' :
                      'Investment Preferences'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderOnboardingStep()}

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevStep}
                disabled={onboardingStep === 1}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button onClick={handleNextStep}>
                {onboardingStep === 4 ? 'Create Portfolio' : 'Next'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Personalized Portfolio</h1>
          <p className="text-muted-foreground">
            Based on your {investmentPref.riskTolerance} risk tolerance and {investmentPref.investmentGoal} goals
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={handleReset}>
            Reset Data
          </Button>
          <Button size="sm" variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Funds
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Performance</CardTitle>
              <CardDescription>Projected growth based on your profile</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-[300px] flex items-center justify-center">
                  <div className="animate-pulse">Loading performance data...</div>
                </div>
              ) : (
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={portfolioHistory}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="month" stroke="#888" />
                      <YAxis
                        stroke="#888"
                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                      />
                      <Tooltip
                        formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                        contentStyle={{ backgroundColor: "#1E1E1E", borderColor: "#333" }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="value"
                        name="Your Portfolio"
                        stroke="#4CAF50"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="benchmark"
                        name="Market Benchmark"
                        stroke="#2196F3"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Recommended Investments</CardTitle>
                <CardDescription>
                  {totalSelectedAllocation.toFixed(1)}% of portfolio selected
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-2 p-3 text-muted-foreground text-sm font-medium">
                  <div className="col-span-5">Investment</div>
                  <div className="col-span-2 text-right">Type</div>
                  <div className="col-span-2 text-right">Allocation</div>
                  <div className="col-span-2 text-right">Risk</div>
                  <div className="col-span-1 text-right">Select</div>
                </div>

                {recommendedInvestments.map((investment) => (
                  <div
                    key={investment.id}
                    className={`grid grid-cols-12 gap-2 px-3 py-3 items-center border-t border-gray-800 hover:bg-gray-900 transition-colors ${selectedInvestments[investment.id] ? 'bg-blue-900/20' : ''}`}
                    onClick={() => toggleInvestmentSelection(investment.id)}
                  >
                    <div className="col-span-5">
                      <div className="font-medium">{investment.name}</div>
                      <div className="text-xs text-muted-foreground">{investment.description}</div>
                    </div>
                    <div className="col-span-2 text-right capitalize">{investment.type}</div>
                    <div className="col-span-2 text-right">{investment.allocationPercentage.toFixed(1)}%</div>
                    <div className="col-span-2 text-right">
                      <span className={`inline-block w-2 h-2 rounded-full mr-1 ${investment.riskLevel === 'high' ? 'bg-red-500' :
                          investment.riskLevel === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}></span>
                      {investment.riskLevel}
                    </div>
                    <div className="col-span-1 text-right">
                      <input
                        type="checkbox"
                        checked={!!selectedInvestments[investment.id]}
                        onChange={() => toggleInvestmentSelection(investment.id)}
                        className="h-4 w-4"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Investment Summary</CardTitle>
              <CardDescription>Your current investment plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Initial Investment</span>
                  <span>${investmentPref.initialAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monthly Contribution</span>
                  <span>${investmentPref.monthlyContribution.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time Horizon</span>
                  <span>{investmentPref.timeHorizon} years</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-3">Projected Value in {investmentPref.timeHorizon} Years</h3>
                <div className="text-2xl font-bold text-green-500">
                  ${calculateProjectedValue().toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Based on historical returns for your risk profile
                </p>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-3">Portfolio Allocation</h3>
                <div className="space-y-2">
                  {Object.entries(assetAllocation).map(([asset, percentage]) => (
                    percentage > 0 && (
                      <div key={asset} className="flex items-center justify-between">
                        <span className="capitalize">{asset}</span>
                        <div className="flex items-center w-1/2">
                          <Progress
                            value={percentage}
                            className="h-2 mr-2"
                            indicatorColor={
                              asset === 'stocks' ? 'bg-blue-500' :
                                asset === 'bonds' ? 'bg-green-500' :
                                  asset === 'realEstate' ? 'bg-purple-500' :
                                    asset === 'crypto' ? 'bg-orange-500' : 'bg-gray-500'
                            }
                          />
                          <span>{percentage}%</span>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>

              <Button className="w-full mt-4">
                {investmentPref.involvement === 'automated' ? 'Automate This Portfolio' :
                  investmentPref.involvement === 'guided' ? 'Schedule Advisor Consultation' :
                    'Implement Portfolio'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Portfolio Risk</CardTitle>
              <CardDescription>Adjusted to your tolerance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gray-900 rounded-lg">
                  <h3 className="text-sm font-medium mb-3">Overall Risk Score</h3>
                  <RiskIndicator
                    riskScore={
                      investmentPref.riskTolerance === 'high' ? 75 :
                        investmentPref.riskTolerance === 'medium' ? 50 : 25
                    }
                    size="lg"
                  />
                  <p className="text-sm text-gray-400 mt-3">
                    {investmentPref.riskTolerance === 'high' ?
                      "Your portfolio is optimized for growth with higher volatility" :
                      investmentPref.riskTolerance === 'medium' ?
                        "Your portfolio balances growth and stability" :
                        "Your portfolio prioritizes capital preservation"}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Risk Factors</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span>Emergency Fund</span>
                      <span className={
                        financialSituation.emergencyFund === 'full' ? 'text-green-500' :
                          financialSituation.emergencyFund === 'partial' ? 'text-yellow-500' : 'text-red-500'
                      }>
                        {financialSituation.emergencyFund === 'full' ? 'Adequate' :
                          financialSituation.emergencyFund === 'partial' ? 'Partial' : 'None'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Debt Situation</span>
                      <span className={
                        financialSituation.debtType === 'none' ? 'text-green-500' :
                          financialSituation.debtType === 'low' ? 'text-yellow-500' : 'text-red-500'
                      }>
                        {financialSituation.debtType === 'none' ? 'No debt' :
                          financialSituation.debtType === 'low' ? 'Low-interest' : 'High-interest'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Employment Stability</span>
                      <span className={
                        financialSituation.employment === 'stable' ? 'text-green-500' :
                          financialSituation.employment === 'variable' ? 'text-yellow-500' : 'text-gray-500'
                      }>
                        {financialSituation.employment === 'stable' ? 'Stable' :
                          financialSituation.employment === 'variable' ? 'Variable' : 'Retired'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Dependents</span>
                      <span className={
                        financialSituation.dependents === 'none' ? 'text-green-500' :
                          financialSituation.dependents === 'partnered' ? 'text-yellow-500' : 'text-red-500'
                      }>
                        {financialSituation.dependents === 'none' ? 'None' :
                          financialSituation.dependents === 'partnered' ? 'Partner' :
                            financialSituation.dependents === 'children' ? 'Children' : 'Elderly'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Button variant="outline" className="justify-start">
                Rebalance Portfolio
              </Button>
              <Button variant="outline" className="justify-start">
                Adjust Risk Level
              </Button>
              <Button variant="outline" className="justify-start">
                Change Contributions
              </Button>
              {financialSituation.emergencyFund !== 'full' && (
                <Button variant="outline" className="justify-start text-red-500 border-red-500">
                  Boost Emergency Fund
                </Button>
              )}
              {financialSituation.debtType === 'high' && (
                <Button variant="outline" className="justify-start text-red-500 border-red-500">
                  Debt Paydown Strategy
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;