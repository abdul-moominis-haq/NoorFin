// src/lib/data.ts
interface MarketIndex {
    name: string;
    symbol: string;
    price: number;
    change: number;
    volume: number;
    sectors: string[];
}

interface Stock {
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
    history?: { date: Date; price: number }[];
}

interface Bond {
    name: string;
    symbol: string;
    yield: number;
    change: number;
    duration: string;
    creditRating: string;
}

interface MutualFund {
    name: string;
    symbol: string;
    nav: number;
    change: number;
    category: string;
    expenseRatio: number;
}

interface ETF {
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
    history?: { date: Date; price: number }[];
}

interface REIT {
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
    history?: { date: Date; price: number }[];
}

interface Commodity {
    name: string;
    symbol: string;
    price: number;
    change: number;
    volume: number;
    sector: string;
    history?: { date: Date; price: number }[];
}

interface Cryptocurrency {
    name: string;
    symbol: string;
    price: number;
    change: number;
    volume: number;
    marketCap: number;
    circulatingSupply: number;
    allTimeHigh: number;
    allTimeLow: number;
    history?: { date: Date; price: number }[];
}

interface CertificateOfDeposit {
    name: string;
    symbol: string;
    yield: number;
    change: number;
    duration: string;
    creditRating: string;
}

interface P2PLending {
    name: string;
    symbol: string;
    yield: number;
    change: number;
    duration: string;
    creditRating: string;
}

interface Annuity {
    name: string;
    symbol: string;
    yield: number;
    change: number;
    duration: string;
    creditRating: string;
}

interface Treasury {
    name: string;
    symbol: string;
    yield: number;
    change: number;
    duration: string;
    creditRating: string;
}

interface HighYieldAccount {
    name: string;
    symbol: string;
    yield: number;
    change: number;
    duration: string;
    creditRating: string;
}

interface Collectible {
    name: string;
    symbol: string;
    price: number;
    change: number;
    volume: number;
    sector: string;
}

interface VentureCapital {
    name: string;
    symbol: string;
    price: number;
    change: number;
    volume: number;
    sector: string;
}

interface ForexPair {
    name: string;
    symbol: string;
    price: number;
    change: number;
    volume: number;
}

interface ESGInvestment {
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
    history?: { date: Date; price: number }[];
}

interface FinancialNews {
    id: string;
    title: string;
    content: string;
    date: Date;
    source: string;
    categories: string[];
    symbols: string[];
    sentimentScore: number;
}

interface EconomicIndicator {
    name: string;
    value: number;
    previous: number;
    change: number;
    unit: string;
    date: Date;
}

interface FinancialData {
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

// Helper functions
const randomInRange = (min: number, max: number, precision = 2) =>
    parseFloat((Math.random() * (max - min) + min).toFixed(precision));

const weightedRandom = (mean: number, stdDev: number) => {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return parseFloat((mean + stdDev * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)).toFixed(2));
};

const generateHistoricalPrices = (basePrice: number, days: number, volatility: number, endDate: Date) => {
    return Array.from({ length: days }, (_, i) => ({
        date: new Date(endDate.getTime() - (days - i - 1) * 86400000),
        price: weightedRandom(basePrice, basePrice * volatility)
    }));
};

// Sector definitions
const sectors = [
    'Technology', 'Financial', 'Healthcare', 'Consumer Cyclical',
    'Industrial', 'Energy', 'Utilities', 'Real Estate',
    'Consumer Defensive', 'Communication', 'Basic Materials'
];

// Generate financial data for March 2025
export const financialData: FinancialData = {
    timestamp: new Date('2025-03-30T16:30:00-05:00'),

    // Market Indices (20)
    marketIndices: [
        { name: "S&P 500", symbol: "SPX", price: 5824.15, change: 0.42, volume: 3500, sectors: ["Diversified"] },
        { name: "NASDAQ Composite", symbol: "IXIC", price: 18456.78, change: 0.85, volume: 4800, sectors: ["Technology"] },
        { name: "Dow Jones Industrial", symbol: "DJI", price: 41234.56, change: 0.31, volume: 3200, sectors: ["Diversified"] },
        { name: "Russell 2000", symbol: "RUT", price: 2345.67, change: -0.18, volume: 1800, sectors: ["Small Cap"] },
        { name: "S&P 500 Growth", symbol: "SGX", price: 9256.89, change: 0.72, volume: 1500, sectors: ["Growth"] },
        { name: "S&P 500 Value", symbol: "SVX", price: 5876.54, change: 0.15, volume: 1300, sectors: ["Value"] },
        { name: "FTSE 100", symbol: "FTSE", price: 8456.78, change: -0.25, volume: 1500, sectors: ["Diversified"] },
        { name: "DAX", symbol: "DAX", price: 18765.43, change: 0.62, volume: 1200, sectors: ["Diversified"] },
        { name: "CAC 40", symbol: "CAC", price: 8234.56, change: 0.38, volume: 1100, sectors: ["Diversified"] },
        { name: "Nikkei 225", symbol: "N225", price: 41234.56, change: 1.25, volume: 2200, sectors: ["Diversified"] },
        { name: "Hang Seng", symbol: "HSI", price: 21567.89, change: -0.85, volume: 2800, sectors: ["Diversified"] },
        { name: "Shanghai Composite", symbol: "SSEC", price: 3567.89, change: -0.45, volume: 3200, sectors: ["Diversified"] },
        { name: "S&P/TSX Composite", symbol: "GSPTSE", price: 23456.78, change: 0.18, volume: 850, sectors: ["Diversified"] },
        { name: "ASX 200", symbol: "AXJO", price: 8456.78, change: 0.42, volume: 550, sectors: ["Diversified"] },
        { name: "BSE Sensex", symbol: "BSESN", price: 76543.21, change: 1.15, volume: 1800, sectors: ["Diversified"] },
        { name: "Euro Stoxx 50", symbol: "SX5E", price: 4876.54, change: 0.52, volume: 1200, sectors: ["Diversified"] },
        { name: "MSCI World", symbol: "URTH", price: 145.67, change: 0.28, volume: 450, sectors: ["Global"] },
        { name: "MSCI Emerging Markets", symbol: "EEM", price: 62.34, change: -0.15, volume: 550, sectors: ["Emerging"] },
        { name: "S&P Global Clean Energy", symbol: "SPGCE", price: 2345.67, change: 1.85, volume: 350, sectors: ["Clean Energy"] },
        { name: "NYSE Composite", symbol: "NYA", price: 18765.43, change: 0.38, volume: 1500, sectors: ["Diversified"] }
    ],

    // Stocks (50 per sector × 11 sectors = 550)
    stocks: sectors.flatMap(sector => {
        const sectorBeta = randomInRange(0.8, 1.4);
        const sectorPE = sector === 'Technology' ? randomInRange(28, 50) :
            sector === 'Utilities' ? randomInRange(14, 20) :
                randomInRange(18, 28);

        return Array.from({ length: 50 }, (_, i) => {
            const marketCap = weightedRandom(
                sector === 'Technology' ? 250 : 80,
                sector === 'Technology' ? 150 : 50
            );
            const price = weightedRandom(
                sector === 'Technology' ? 250 : 80,
                sector === 'Technology' ? 100 : 40
            );
            const sharesOutstanding = marketCap * 1000000000 / price;

            return {
                name: `${sector} Company ${i + 1}`,
                symbol: `${sector.substring(0, 3).toUpperCase()}${i + 1}`,
                price,
                change: randomInRange(-3, 3),
                volume: Math.round(weightedRandom(2.5, 1.2) * sharesOutstanding / 1000000),
                marketCap,
                peRatio: weightedRandom(sectorPE, sectorPE * 0.3),
                dividendYield: sector === 'Utilities' ? randomInRange(3.5, 5.5) :
                    sector === 'Consumer Defensive' ? randomInRange(2.5, 4.5) :
                        randomInRange(0.5, 2.5),
                sector,
                beta: weightedRandom(sectorBeta, 0.2),
                history: generateHistoricalPrices(price, 30, 0.015, new Date('2025-03-30'))
            };
        });
    }),

    // Bonds (50)
    bonds: Array.from({ length: 50 }, (_, i) => {
        const durations = ["1 Month", "3 Month", "6 Month", "1 Year", "2 Year", "3 Year", "5 Year", "7 Year", "10 Year", "20 Year", "30 Year"];
        const creditRatings = ["AAA", "AA+", "AA", "AA-", "A+", "A", "A-", "BBB+", "BBB", "BBB-"];

        return {
            name: `${i < 10 ? 'US' : i < 20 ? 'UK' : i < 30 ? 'Germany' : i < 40 ? 'Japan' : 'Global'} ${durations[i % durations.length]} Bond`,
            symbol: `${i < 10 ? 'US' : i < 20 ? 'UK' : i < 30 ? 'DE' : i < 40 ? 'JP' : 'GL'}${durations[i % durations.length].replace(/\s+/g, '')}`,
            yield: weightedRandom(3.8, 1.2),
            change: randomInRange(-0.1, 0.1),
            duration: durations[i % durations.length],
            creditRating: creditRatings[i % creditRatings.length]
        };
    }),

    // Mutual Funds (50)
    mutualFunds: Array.from({ length: 50 }, (_, i) => {
        const categories = [
            "Large Blend", "Large Growth", "Large Value",
            "Mid-Cap Blend", "Mid-Cap Growth", "Mid-Cap Value",
            "Small Blend", "Small Growth", "Small Value",
            "International", "Global", "Sector", "Bond", "Balanced"
        ];
        const category = categories[i % categories.length];

        return {
            name: `${category} Mutual Fund ${i + 1}`,
            symbol: `MF${category.substring(0, 2).toUpperCase()}${i + 1}`,
            nav: weightedRandom(75, 35),
            change: randomInRange(-1, 1),
            category,
            expenseRatio: weightedRandom(0.45, 0.25)
        };
    }),

    // ETFs (50)
    etfs: Array.from({ length: 50 }, (_, i) => {
        const sectors = [
            "Technology", "Financial", "Healthcare", "Consumer",
            "Industrial", "Energy", "Utilities", "Real Estate",
            "Communication", "Materials", "Global", "Bond", "Commodity"
        ];
        const sector = sectors[i % sectors.length];
        const price = weightedRandom(150, 75);

        return {
            name: `${sector} ETF ${i + 1}`,
            symbol: `ETF${sector.substring(0, 3).toUpperCase()}${i + 1}`,
            price,
            change: randomInRange(-2, 2),
            volume: weightedRandom(15, 8),
            marketCap: weightedRandom(80, 50),
            peRatio: sector === 'Technology' ? weightedRandom(30, 8) : weightedRandom(20, 6),
            dividendYield: sector === 'Utilities' ? weightedRandom(3.5, 1.2) : weightedRandom(1.5, 1),
            sector,
            beta: weightedRandom(1.0, 0.3),
            history: generateHistoricalPrices(price, 30, 0.015, new Date('2025-03-30'))
        };
    }),

    // REITs (50)
    reits: Array.from({ length: 50 }, (_, i) => {
        const reitTypes = [
            "Office", "Retail", "Industrial", "Residential",
            "Healthcare", "Hotel", "Storage", "Diversified",
            "Data Center", "Cell Tower", "Timber", "Infrastructure"
        ];
        const type = reitTypes[i % reitTypes.length];
        const price = weightedRandom(150, 75);

        return {
            name: `${type} REIT ${i + 1}`,
            symbol: `REIT${type.substring(0, 3).toUpperCase()}${i + 1}`,
            price,
            change: randomInRange(-2, 2),
            volume: weightedRandom(8, 5),
            marketCap: weightedRandom(50, 30),
            peRatio: weightedRandom(40, 12),
            dividendYield: weightedRandom(4.5, 1.8),
            sector: "Real Estate",
            beta: weightedRandom(0.9, 0.2),
            history: generateHistoricalPrices(price, 30, 0.015, new Date('2025-03-30'))
        };
    }),

    // Commodities (50)
    commodities: Array.from({ length: 50 }, (_, i) => {
        const commodityTypes = [
            "Gold", "Silver", "Platinum", "Palladium",
            "Crude Oil", "Natural Gas", "Gasoline", "Heating Oil",
            "Wheat", "Corn", "Soybeans", "Coffee", "Sugar", "Cotton",
            "Copper", "Aluminum", "Zinc", "Nickel", "Iron Ore", "Lithium"
        ];
        const type = commodityTypes[i % commodityTypes.length];
        const price = type === 'Gold' ? weightedRandom(2200, 300) :
            type === 'Silver' ? weightedRandom(28, 6) :
                type === 'Crude Oil' ? weightedRandom(85, 20) :
                    type === 'Wheat' ? weightedRandom(8.5, 2.5) :
                        type === 'Copper' ? weightedRandom(4.2, 0.8) :
                            type === 'Lithium' ? weightedRandom(22, 8) :
                                weightedRandom(120, 60);

        return {
            name: type,
            symbol: type === 'Crude Oil' ? 'CL' :
                type === 'Natural Gas' ? 'NG' :
                    type.substring(0, 3).toUpperCase(),
            price,
            change: randomInRange(-3, 3),
            volume: weightedRandom(60, 40),
            sector: type === 'Gold' ? 'Precious Metals' :
                type === 'Crude Oil' ? 'Energy' :
                    type === 'Wheat' ? 'Agriculture' :
                        'Industrial Metals',
            history: generateHistoricalPrices(price, 30, 0.02, new Date('2025-03-30'))
        };
    }),

    // Cryptocurrencies (50)
    cryptocurrencies: Array.from({ length: 50 }, (_, i) => {
        const cryptoTypes = [
            "Bitcoin", "Ethereum", "Binance Coin", "XRP", "Solana",
            "Cardano", "Dogecoin", "Polkadot", "Polygon", "Litecoin",
            "Chainlink", "Avalanche", "Stellar", "Uniswap", "Bitcoin Cash",
            "Algorand", "VeChain", "Filecoin", "Cosmos", "Tezos"
        ];
        const type = i < cryptoTypes.length ? cryptoTypes[i] : `CryptoToken${i + 1}`;
        const price = type === 'Bitcoin' ? weightedRandom(85000, 25000) :
            type === 'Ethereum' ? weightedRandom(6500, 2000) :
                weightedRandom(150, 80);

        return {
            name: type,
            symbol: type === 'Bitcoin' ? 'BTC' :
                type === 'Ethereum' ? 'ETH' :
                    type.substring(0, 3).toUpperCase(),
            price,
            change: randomInRange(-5, 5),
            volume: weightedRandom(300, 150),
            marketCap: price * weightedRandom(1500000, 800000),
            circulatingSupply: weightedRandom(1200000000, 600000000),
            allTimeHigh: price * weightedRandom(1.2, 0.3),
            allTimeLow: price * weightedRandom(0.05, 0.03),
            history: generateHistoricalPrices(price, 30, 0.03, new Date('2025-03-30'))
        };
    }),

    // Fixed Income (10 each)
    cds: Array.from({ length: 10 }, (_, i) => ({
        name: `${i + 1 * 6} Month CD`,
        symbol: `CD${i + 1 * 6}M`,
        yield: weightedRandom(4.2, 0.6),
        change: randomInRange(-0.05, 0.05),
        duration: `${i + 1 * 6} Months`,
        creditRating: "AAA"
    })),

    p2pLending: Array.from({ length: 10 }, (_, i) => ({
        name: `P2P Loan ${i + 1}`,
        symbol: `P2P${i + 1}`,
        yield: weightedRandom(7.5, 1.8),
        change: randomInRange(-0.1, 0.1),
        duration: `${i + 1} Year${i > 0 ? 's' : ''}`,
        creditRating: ["AA", "A", "BBB", "BB", "B"][i % 5]
    })),

    annuities: Array.from({ length: 10 }, (_, i) => ({
        name: `Annuity ${i + 1}`,
        symbol: `ANN${i + 1}`,
        yield: weightedRandom(4.0, 0.9),
        change: randomInRange(-0.05, 0.05),
        duration: `${i + 1} Year${i > 0 ? 's' : ''}`,
        creditRating: ["AAA", "AA", "A"][i % 3]
    })),

    treasuries: Array.from({ length: 10 }, (_, i) => ({
        name: `Treasury ${i + 1}`,
        symbol: `T${i + 1}`,
        yield: weightedRandom(3.8, 1.0),
        change: randomInRange(-0.05, 0.05),
        duration: `${i + 1} Year${i > 0 ? 's' : ''}`,
        creditRating: "AAA"
    })),

    highYieldAccounts: Array.from({ length: 10 }, (_, i) => ({
        name: `High Yield Account ${i + 1}`,
        symbol: `HYA${i + 1}`,
        yield: weightedRandom(4.2, 0.6),
        change: randomInRange(-0.05, 0.05),
        duration: "N/A",
        creditRating: "FDIC"
    })),

    // Alternative Investments (10 each)
    collectibles: Array.from({ length: 10 }, (_, i) => {
        const types = ["Art", "Wine", "Watches", "Cars", "Jewelry", "Coins", "Stamps", "Sports Cards", "Comics", "Antiques"];
        return {
            name: `${types[i]} Index`,
            symbol: types[i].substring(0, 3).toUpperCase(),
            price: weightedRandom(1500, 800),
            change: randomInRange(-2, 2),
            volume: weightedRandom(8, 5),
            sector: types[i]
        };
    }),

    ventureCapital: Array.from({ length: 10 }, (_, i) => {
        const sectors = ["Tech", "Biotech", "Fintech", "AI", "Blockchain", "Clean Energy", "Space", "Robotics", "Cybersecurity", "Edtech"];
        return {
            name: `${sectors[i]} VC Index`,
            symbol: `VC${sectors[i].substring(0, 2).toUpperCase()}`,
            price: weightedRandom(300, 150),
            change: randomInRange(-3, 3),
            volume: weightedRandom(3, 2),
            sector: sectors[i]
        };
    }),

    // Forex (50)
    forex: Array.from({ length: 50 }, (_, i) => {
        const baseCurrencies = ["USD", "EUR", "JPY", "GBP", "AUD", "CAD", "CHF", "CNY", "NZD", "SEK"];
        const quoteCurrencies = ["EUR", "USD", "JPY", "GBP", "CHF", "CAD", "AUD", "NZD", "SEK", "NOK"];
        const pair = `${baseCurrencies[i % baseCurrencies.length]}/${quoteCurrencies[(i + 1) % quoteCurrencies.length]}`;

        let price = 1.0;
        if (pair === "EUR/USD") price = weightedRandom(1.12, 0.08);
        else if (pair === "USD/JPY") price = weightedRandom(135, 10);
        else if (pair === "GBP/USD") price = weightedRandom(1.28, 0.07);
        else price = weightedRandom(1.0, 0.5);

        return {
            name: pair,
            symbol: pair.replace("/", ""),
            price,
            change: randomInRange(-0.5, 0.5),
            volume: weightedRandom(600, 350)
        };
    }),

    // ESG Investments (10)
    esgInvestments: Array.from({ length: 10 }, (_, i) => {
        const price = weightedRandom(180, 90);
        return {
            name: `ESG Fund ${i + 1}`,
            symbol: `ESG${i + 1}`,
            price,
            change: randomInRange(-1, 1),
            volume: weightedRandom(15, 8),
            marketCap: weightedRandom(80, 50),
            peRatio: weightedRandom(25, 7),
            dividendYield: weightedRandom(2.5, 1.2),
            sector: ["Clean Energy", "Sustainability", "Social Impact", "Governance"][i % 4],
            beta: weightedRandom(0.9, 0.2),
            history: generateHistoricalPrices(price, 30, 0.015, new Date('2025-03-30'))
        };
    }),

    // Market News (50)
    marketNews: Array.from({ length: 50 }, (_, i) => {
        const categories = [
            "Economy", "Fed", "Earnings", "Mergers", "Politics",
            "Technology", "Healthcare", "Energy", "Financial", "International"
        ];
        const symbols = ["SPX", "DJI", "IXIC", "AAPL", "MSFT", "GOOG", "AMZN", "TSLA", "NVDA", "META"];
        const headlines = [
            "Fed Maintains Rates at 3.75-4.00% as Inflation Cools Further",
            "AI Boom Continues as Tech Giants Report Record Earnings",
            "Global Clean Energy Investments Reach $1.5 Trillion in 2024",
            "Bitcoin ETF Trading Volumes Hit Record Highs",
            "Commercial Real Estate Market Shows Signs of Recovery",
            "Quantum Computing Breakthrough Announced by Tech Leaders",
            "EV Adoption Reaches 40% of New Car Sales in Key Markets",
            "Space Economy Projected to Reach $1 Trillion by 2030",
            "Global GDP Growth Revised Upward to 3.2% for 2025",
            "Carbon Credit Markets See Increased Institutional Participation"
        ];

        return {
            id: `news${i + 1}`,
            title: headlines[i % headlines.length],
            content: `This is a detailed news article about current market developments in ${categories[i % categories.length]}. The story discusses recent trends and potential implications for investors in the current economic environment.`,
            date: new Date(Date.now() - i * 3600000),
            source: ["Bloomberg", "CNBC", "Reuters", "WSJ", "Financial Times"][i % 5],
            categories: [categories[i % categories.length]],
            symbols: [symbols[i % symbols.length]],
            sentimentScore: randomInRange(-1, 1)
        };
    }),

    // Economic Indicators (50)
    economicIndicators: Array.from({ length: 50 }, (_, i) => {
        const indicators = [
            "GDP Growth", "Unemployment Rate", "CPI", "PPI", "Retail Sales",
            "Industrial Production", "Housing Starts", "Building Permits",
            "Consumer Confidence", "Manufacturing PMI", "Services PMI",
            "Trade Balance", "Current Account", "Government Debt", "Inflation Rate",
            "Core Inflation", "Wage Growth", "Productivity", "Business Inventories",
            "Durable Goods Orders"
        ];

        let value = 0;
        if (indicators[i % indicators.length] === "Unemployment Rate") value = weightedRandom(3.6, 0.3);
        else if (indicators[i % indicators.length] === "CPI") value = weightedRandom(2.8, 0.4);
        else if (indicators[i % indicators.length] === "GDP Growth") value = weightedRandom(2.5, 0.7);
        else value = weightedRandom(3.0, 2.0);

        return {
            name: indicators[i % indicators.length],
            value,
            previous: value + randomInRange(-0.3, 0.3),
            change: randomInRange(-0.5, 0.5),
            unit: i % 3 === 0 ? "%" : i % 3 === 1 ? "M" : "B",
            date: new Date(Date.now() - i * 86400000)
        };
    })
};

// Generate historical data for all applicable assets
const enhanceWithHistory = <T extends { symbol: string; price?: number; yield?: number }>(assets: T[]): (T & { history: { date: Date; price: number }[] })[] => {
    return assets.map(asset => ({
        ...asset,
        history: generateHistoricalPrices(
            asset.price ?? (asset.yield ? asset.yield * 100 : 100),
            30,
            asset.symbol.length % 2 === 0 ? 0.02 : 0.015,
            new Date('2025-03-30')
        )
    }));
};

// Enhance data with history
financialData.stocks = enhanceWithHistory(financialData.stocks);
financialData.etfs = enhanceWithHistory(financialData.etfs);
financialData.cryptocurrencies = enhanceWithHistory(financialData.cryptocurrencies);
financialData.reits = enhanceWithHistory(financialData.reits);
financialData.commodities = enhanceWithHistory(financialData.commodities);
financialData.esgInvestments = enhanceWithHistory(financialData.esgInvestments);

export default financialData;