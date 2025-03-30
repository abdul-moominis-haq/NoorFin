// src/lib/data.ts
export interface MarketIndex {
    name: string;
    symbol: string;
    price: number;
    change: number;
    volume: number;
    sectors: string[];
  }
  
  export interface Stock {
    name: string;
    symbol: string;
    price: number;
    change: number;
    volume: number;
    marketCap: number;
    peRatio: number;
    dividendYield: number;
    sector: string;
    beta: number;
  }
  
  export interface Bond {
    name: string;
    symbol: string;
    yield: number;
    change: number;
    duration: string;
    creditRating: string;
  }
  
  export interface MutualFund {
    name: string;
    symbol: string;
    nav: number;
    change: number;
    category: string;
    expenseRatio: number;
  }
  
  export interface ETF {
    name: string;
    symbol: string;
    price: number;
    change: number;
    volume: number;
    marketCap: number;
    peRatio: number;
    dividendYield: number;
    sector: string;
    beta: number;
  }
  
  export interface REIT {
    name: string;
    symbol: string;
    price: number;
    change: number;
    volume: number;
    marketCap: number;
    peRatio: number;
    dividendYield: number;
    sector: string;
    beta: number;
  }
  
  export interface Commodity {
    name: string;
    symbol: string;
    price: number;
    change: number;
    volume: number;
    sector: string;
  }
  
  export interface Cryptocurrency {
    name: string;
    symbol: string;
    price: number;
    change: number;
    volume: number;
    marketCap: number;
    circulatingSupply: number;
    allTimeHigh: number;
    allTimeLow: number;
  }
  
  export interface CertificateOfDeposit {
    name: string;
    symbol: string;
    yield: number;
    change: number;
    duration: string;
    creditRating: string;
  }
  
  export interface P2PLending {
    name: string;
    symbol: string;
    yield: number;
    change: number;
    duration: string;
    creditRating: string;
  }
  
  export interface Annuity {
    name: string;
    symbol: string;
    yield: number;
    change: number;
    duration: string;
    creditRating: string;
  }
  
  export interface Treasury {
    name: string;
    symbol: string;
    yield: number;
    change: number;
    duration: string;
    creditRating: string;
  }
  
  export interface HighYieldAccount {
    name: string;
    symbol: string;
    yield: number;
    change: number;
    duration: string;
    creditRating: string;
  }
  
  export interface Collectible {
    name: string;
    symbol: string;
    price: number;
    change: number;
    volume: number;
    sector: string;
  }
  
  export interface VentureCapital {
    name: string;
    symbol: string;
    price: number;
    change: number;
    volume: number;
    sector: string;
  }
  
  export interface ForexPair {
    name: string;
    symbol: string;
    price: number;
    change: number;
    volume: number;
  }
  
  export interface ESGInvestment {
    name: string;
    symbol: string;
    price: number;
    change: number;
    volume: number;
    marketCap: number;
    peRatio: number;
    dividendYield: number;
    sector: string;
    beta: number;
  }
  
  export interface FinancialNews {
    id: string;
    title: string;
    content: string;
    date: Date;
    source: string;
    categories: string[];
    symbols: string[];
    sentimentScore: number;
  }
  
  export interface EconomicIndicator {
    name: string;
    value: number;
    previous: number;
    change: number;
    unit: string;
    date: Date;
  }
  
  export interface FinancialData {
    timestamp: Date;
    marketIndices: MarketIndex[];
    stocks: Stock[];
    bonds: Bond[];
    mutualFunds: MutualFund[];
    etfs: ETF[];
    reits: REIT[];
    commodities: Commodity[];
    cryptocurrencies: Cryptocurrency[];
    cds: CertificateOfDeposit[];
    p2pLending: P2PLending[];
    annuities: Annuity[];
    treasuries: Treasury[];
    highYieldAccounts: HighYieldAccount[];
    collectibles: Collectible[];
    ventureCapital: VentureCapital[];
    forex: ForexPair[];
    esgInvestments: ESGInvestment[];
    marketNews: FinancialNews[];
    economicIndicators: EconomicIndicator[];
  }
  
  // ... [rest of your data implementation]