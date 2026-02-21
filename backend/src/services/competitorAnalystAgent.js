require('dotenv').config();
const Groq = require('groq-sdk');
const log = require('../utils/logger');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const competitorAnalystAgent = {
  analyze: async (startupIdea) => {
    try {
      log.info('Competitor Analyst Agent started');

      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are an expert competitive analyst. Identify real competitors and provide actionable competitive insights. Keep responses under 250 words."
          },
          {
            role: "user",
            content: `Analyze competitors for this startup idea:

"${startupIdea}"

Provide:
1. Top 5 Direct or Adjacent Competitors (real company names if possible)
2. Their Market Position and strengths
3. Your Competitive Advantages vs them
4. Market Gaps You Can Exploit

Be specific with competitor names and strategies.`
          }
        ],
       model: "llama-3.3-70b-versatile",

        temperature: 0.7,
        max_tokens: 400
      });

      const analysis = completion.choices[0]?.message?.content || 'Analysis not available';

      log.success('Competitor Analyst Agent completed');

      return {
        agent: 'Competitor Analyst',
        analysis: analysis,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      log.error(`Competitor Analyst Agent failed: ${error.message}`);
      
      return {
        agent: 'Competitor Analyst',
        analysis: `Competitor Analysis for "${startupIdea.substring(0, 60)}...":

**Competitive Landscape:** The market includes several established players and emerging startups targeting similar customer needs.

**Key Competitors & Positioning:**
- Established incumbents: Strong brand recognition but slower innovation cycles
- Venture-backed startups: Aggressive growth focus, high burn rates
- Bootstrapped competitors: Niche focus, limited resources

**Your Competitive Advantages:**
1. Modern technology stack and better UX
2. More flexible pricing models
3. Faster iteration and customer responsiveness
4. Untapped distribution channels

**Market Gaps to Exploit:**
- Underserved customer segments (SMBs, specific industries)
- Feature gaps in existing solutions
- Better integration capabilities
- Superior customer support and onboarding`,
        error: error.message
      };
    }
  }
};

module.exports = competitorAnalystAgent;
