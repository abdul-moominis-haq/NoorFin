import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: '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', // Replace with your real API key
    dangerouslyAllowBrowser: true
});

export async function getChatGPTAnalysis(prompt: string): Promise<string> {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: 'You are a financial analyst assistant. Provide concise, data-driven insights based on the provided information. Format responses with clear headings and bullet points when appropriate.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 500
        });

        return response.choices[0]?.message?.content || "No response from AI.";
    } catch (error) {
        console.error('Error calling ChatGPT API:', error);
        return "Unable to generate analysis at this time. Please try again later.";
    }
}