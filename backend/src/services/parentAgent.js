require('dotenv').config();
const Groq = require('groq-sdk');
const marketAnalystAgent = require('./marketAnalystAgent');
const competitorAnalystAgent = require('./competitorAnalystAgent');
const financialForecasterAgent = require('./financialForecasterAgent');
const log = require('../utils/logger');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const parentAgent = {
  evaluate: async (startupIdea) => {
    try {
      log.info('Parent Agent orchestrating evaluation');

      // Run all child agents in parallel
      const [marketAnalysis, competitorAnalysis, financialForecast] = await Promise.all([
        marketAnalystAgent.analyze(startupIdea),
        competitorAnalystAgent.analyze(startupIdea),
        financialForecasterAgent.analyze(startupIdea)
      ]);

      // Create executive summary
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a senior investment analyst. Create polished, investor-ready executive summaries that synthesize market, competitive, and financial analysis. Be concise but comprehensive."
          },
          {
            role: "user",
            content: `Based on the following analyses, create an investor-ready executive summary:

STARTUP IDEA: "${startupIdea}"

MARKET ANALYSIS:
${marketAnalysis.analysis}

COMPETITOR ANALYSIS:
${competitorAnalysis.analysis}

FINANCIAL FORECAST:
${financialForecast.analysis}

Create a compelling executive summary covering:
1. Opportunity Assessment
2. Market Viability
3. Competitive Position
4. Financial Outlook
5. Investment Recommendation (Strong Buy / Buy / Hold / Pass)

Keep it under 300 words, investor-focused.`
          }
        ],
       model: "llama-3.3-70b-versatile",

        temperature: 0.7,
        max_tokens: 500
      });

      const finalSummary = completion.choices[0]?.message?.content || 
        `Executive Summary:\n\n${marketAnalysis.analysis}\n\n${competitorAnalysis.analysis}\n\n${financialForecast.analysis}\n\nInvestment Recommendation: This startup demonstrates solid fundamentals across market opportunity, competitive positioning, and financial projections. Recommended for further due diligence.`;

      log.success('Parent Agent completed evaluation');

      return {
        marketAnalysis,
        competitorAnalysis,
        financialForecast,
        finalSummary
      };

    } catch (error) {
      log.error(`Parent Agent failed: ${error.message}`);
      throw error;
    }
  }
};

module.exports = parentAgent;
