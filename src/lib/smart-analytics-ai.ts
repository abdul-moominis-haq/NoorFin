// src/lib/smart-analytics-ai.ts
import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import { financialData } from "./data";

export class SmartAnalyticsAI {
    private data: typeof financialData;
    private sentimentModel: Record<string, number>;
    private sectorKeywords: Record<string, string[]>;
    private sentenceEncoder: use.UniversalSentenceEncoder | null = null;
    private pricePredictionModel: tf.LayersModel | null = null;

    constructor(data: typeof financialData) {
        this.data = data;
        this.initializeModels();
        this.loadMLModels();
    }

    private async loadMLModels() {
        try {
            // Load Universal Sentence Encoder for advanced NLP
            this.sentenceEncoder = await use.load();

            // Load our custom price prediction model
            this.pricePredictionModel = await tf.loadLayersModel('/models/price-prediction/model.json');
        } catch (error) {
            console.error("Failed to load ML models:", error);
        }
    }

    private initializeModels() {
        // Enhanced sentiment scoring model (fallback if ML fails)
        this.sentimentModel = {
            'bullish': 1.5, 'growth': 1.2, 'profit': 1.3, 'beat': 1.1, 'raise': 1.0,
            'bearish': -1.5, 'decline': -1.2, 'loss': -1.3, 'miss': -1.1, 'cut': -1.0,
            // Add more terms
        };

        // Sector-specific keywords
        this.sectorKeywords = {
            'Technology': ['AI', 'cloud', 'software', 'chip', 'innovation'],
            'Financial': ['interest', 'loan', 'bank', 'rate', 'credit'],
            'Healthcare': ['FDA', 'trial', 'drug', 'patient', 'treatment'],
        };
    }

    /**
     * Enhanced sentiment analysis using ML when available
     */
    async analyzeSentiment() {
        if (!this.sentenceEncoder) {
            return this.basicSentimentAnalysis();
        }

        try {
            // Process all news items with ML model
            const texts = this.data.marketNews.map(news => `${news.title} ${news.content}`);
            const embeddings = await this.sentenceEncoder.embed(texts);

            // Simple sentiment classifier (in practice you'd use a trained model)
            const predictions = tf.tidy(() => {
                // This is a simplified approach - in reality you'd use a trained classifier
                const positiveWords = tf.tensor1d(Object.keys(this.sentimentModel).filter(k => this.sentimentModel[k] > 0));
                const negativeWords = tf.tensor1d(Object.keys(this.sentimentModel).filter(k => this.sentimentModel[k] < 0));

                // Calculate similarity to positive/negative terms
                const positiveSim = tf.matMul(embeddings, this.sentenceEncoder!.embed(Array.from(positiveWords.dataSync())));
                const negativeSim = tf.matMul(embeddings, this.sentenceEncoder!.embed(Array.from(negativeWords.dataSync())));

                // Combine results
                return tf.sub(positiveSim.mean(1), negativeSim.mean(1));
            });

            const sentimentScores = await predictions.data();
            predictions.dispose();

            return this.data.marketNews.map((news, i) => ({
                ...news,
                sentimentScore: parseFloat(sentimentScores[i].toFixed(2)),
                sentiment: this.classifySentiment(sentimentScores[i])
            }));
        } catch (error) {
            console.error("ML sentiment analysis failed, falling back to basic:", error);
            return this.basicSentimentAnalysis();
        }
    }

    private basicSentimentAnalysis() {
        return this.data.marketNews.map(news => {
            const content = `${news.title} ${news.content}`.toLowerCase();
            let score = 0;
            let termCount = 0;

            Object.entries(this.sentimentModel).forEach(([term, weight]) => {
                if (content.includes(term)) {
                    score += weight;
                    termCount++;
                }
            });

            const normalizedScore = termCount > 0
                ? Math.max(-1, Math.min(1, score / termCount))
                : 0;

            return {
                ...news,
                sentimentScore: parseFloat(normalizedScore.toFixed(2)),
                sentiment: this.classifySentiment(normalizedScore)
            };
        });
    }

    /**
     * Predict future prices using ML model
     */
    async predictPrices(symbol: string, days: number = 5) {
        if (!this.pricePredictionModel) {
            return this.basicPricePrediction(symbol, days);
        }

        try {
            const stock = this.data.stocks.find(s => s.symbol === symbol);
            if (!stock?.history) return null;

            // Prepare historical data
            const prices = stock.history.map(h => h.price);
            const normalizedPrices = this.normalizeData(prices);

            // Create input tensor
            const input = tf.tensor2d([normalizedPrices.slice(-30)]); // Use last 30 days

            // Make prediction
            const prediction = this.pricePredictionModel.predict(input) as tf.Tensor;
            const results = await prediction.data();
            prediction.dispose();

            // Denormalize and format results
            const predictedPrices = this.denormalizeData(Array.from(results));
            return predictedPrices.slice(0, days); // Return next 'days' predictions
        } catch (error) {
            console.error("Price prediction failed:", error);
            return this.basicPricePrediction(symbol, days);
        }
    }

    private basicPricePrediction(symbol: string, days: number) {
        const stock = this.data.stocks.find(s => s.symbol === symbol);
        if (!stock?.history) return null;

        const prices = stock.history.map(h => h.price);
        const lastPrice = prices[prices.length - 1];
        const avgChange = this.calculateAverageChange(prices);

        // Simple linear projection
        return Array.from({ length: days }, (_, i) =>
            parseFloat((lastPrice * Math.pow(1 + avgChange, i + 1)).toFixed(2))
        );
    }

    private normalizeData(data: number[]): number[] {
        const min = Math.min(...data);
        const max = Math.max(...data);
        return data.map(x => (x - min) / (max - min));
    }

    private denormalizeData(normalized: number[], original: number[] = this.data.stocks.flatMap(s => s.history?.map(h => h.price) || [])): number[] {
        const min = Math.min(...original);
        const max = Math.max(...original);
        return normalized.map(x => x * (max - min) + min);
    }

    private calculateAverageChange(prices: number[]): number {
        if (prices.length < 2) return 0;
        let totalChange = 0;
        for (let i = 1; i < prices.length; i++) {
            totalChange += (prices[i] - prices[i - 1]) / prices[i - 1];
        }
        return totalChange / (prices.length - 1);
    }

    /**
     * Cluster similar stocks using ML embeddings
     */
    async clusterStocks() {
        if (!this.sentenceEncoder) return null;

        try {
            // Use company descriptions or sector info as features
            const stockTexts = this.data.stocks.map(s =>
                `${s.name} ${s.sector} ${this.sectorKeywords[s.sector]?.join(' ') || ''}`
            );

            // Get embeddings
            const embeddings = await this.sentenceEncoder.embed(stockTexts);

            // Simple K-means clustering (in practice you'd use a proper clustering algorithm)
            const k = 5; // Number of clusters
            const centroids = tf.tidy(() => {
                // Initialize random centroids
                return tf.randomNormal([k, embeddings.shape[1]]);
            });

            // Assign stocks to nearest centroid
            const assignments = tf.tidy(() => {
                const distances = tf.matMul(embeddings, centroids, false, true);
                return tf.argMax(distances, 1);
            });

            const clusterIndices = await assignments.data();
            assignments.dispose();
            centroids.dispose();

            return this.data.stocks.map((stock, i) => ({
                ...stock,
                cluster: clusterIndices[i]
            }));
        } catch (error) {
            console.error("Clustering failed:", error);
            return null;
        }
    }

    // ... (keep existing methods like assessRisk, generateRecommendations, etc.)
}