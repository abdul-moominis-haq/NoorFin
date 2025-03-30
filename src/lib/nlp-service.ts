import { financialData } from "./data";

export class NLPService {
    // Sentiment Analysis
    static analyzeSentiment(newsItems: typeof financialData.marketNews) {
        const positive = newsItems.filter(n => n.sentimentScore > 0.5).length;
        const negative = newsItems.filter(n => n.sentimentScore < -0.5).length;
        const neutral = newsItems.length - positive - negative;

        return {
            positivePercentage: Math.round((positive / newsItems.length) * 100),
            negativePercentage: Math.round((negative / newsItems.length) * 100),
            neutralPercentage: Math.round((neutral / newsItems.length) * 100),
            overallSentiment: positive > negative ? 'bullish' : negative > positive ? 'bearish' : 'neutral'
        };
    }

    // Theme Extraction
    static extractKeyThemes(newsItems: typeof financialData.marketNews) {
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
    }

    // Risk Assessment
    static generateRiskAssessment() {
        const cryptoVolatility = financialData.cryptocurrencies.reduce(
            (sum, crypto) => sum + Math.abs(crypto.change), 0) / financialData.cryptocurrencies.length;

        const stockVolatility = financialData.stocks.reduce(
            (sum, stock) => sum + Math.abs(stock.change), 0) / financialData.stocks.length;

        return {
            cryptoRisk: cryptoVolatility > 3 ? 'High' : cryptoVolatility > 1.5 ? 'Medium' : 'Low',
            marketRisk: stockVolatility > 2 ? 'Elevated' : 'Normal',
            bondSafety: financialData.bonds[0]?.yield > 4.5 ? 'Attractive' : 'Average'
        };
    }
}