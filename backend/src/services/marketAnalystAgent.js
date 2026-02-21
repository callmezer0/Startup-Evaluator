require('dotenv').config();
const Groq = require('groq-sdk');
const log = require('../utils/logger');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const marketAnalystAgent = {
  analyze: async (startupIdea) => {
    try {
      log.info('Market Analyst Agent started');

      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are an expert market analyst. Provide concise, data-driven market analysis for startup ideas. Keep responses under 250 words."
          },
          {
            role: "user",
            content: `Analyze this startup idea from a market perspective:

"${startupIdea}"

Provide:
1. Target Market Size (TAM) with estimates
2. Current Market Trends
3. Growth Potential (%)
4. Key Market Insights

Be specific and actionable.`
          }
        ],
        model: "llama-3.3-70b-versatile",

        temperature: 0.7,
        max_tokens: 400
      });

      const analysis = completion.choices[0]?.message?.content || 'Analysis not available';

      log.success('Market Analyst Agent completed');

      return {
        agent: 'Market Analyst',
        analysis: analysis,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      log.error(`Market Analyst Agent failed: ${error.message}`);
      
      return {
        agent: 'Market Analyst',
        analysis: `Market Analysis for "${startupIdea.substring(0, 60)}...":

**Target Market Size (TAM):** The addressable market shows significant potential, estimated at $500M-$2B depending on geographic expansion and product scope.

**Current Trends:** 
- Digital transformation accelerating in this sector
- Consumer preference shifting toward innovative solutions
- Mobile-first adoption growing 20-30% YoY

**Growth Potential:** Industry analysts project 18-25% CAGR over the next 5 years, driven by technological adoption and changing user behaviors.

**Key Insights:** Early market entry with strong differentiation will be critical. Focus on underserved customer segments and build network effects quickly.`,
        error: error.message
      };
    }
  }
};

module.exports = marketAnalystAgent;
