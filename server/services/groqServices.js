const axios = require('axios'); 

const analyzeIdea = async (idea) => {
    const prompt = `
    You are a startup analyst. Analyze the following idea: 
    "${idea}"
    
    Return:
    1. Target market
    2. Three competitors
    3. SWOT  analysis
    4. Estimated time and cost to build MVP. 
    5. Five slide investor pitch (titles+bullet points)
    `; 

    try {    
        const reponse = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions", 
            {
                model: "llama3-70b-8192",
                messages: [
                    {
                        role: 'user', 
                        content: prompt, 
                    }, 
                ],
                temperature: 0.7,
            }, 
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.API_KEY}`,
                },
            }
        );

        return reponse.data.choices[0].message.content;
    } catch (error) {
        console.log("Groq API error:", error.response?.data || error.message);
        throw error;
    }
};  

module.exports = analyzeIdea; 