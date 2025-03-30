export async function getChatGPTAnalysis(prompt: string) {
  // Check if OpenAI is enabled
  if (true) { // You can remove this check if you always want it enabled
    return "AI analysis is currently disabled.";
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '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' // Replace with your real key
      },
      body: JSON.stringify({
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
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "No response from AI.";
  } catch (error) {
    console.error('Error calling ChatGPT API:', error);
    return "Unable to generate analysis at this time.";
  }
}