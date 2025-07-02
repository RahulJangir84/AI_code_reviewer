const aiService = require("../services/ai.service");

module.exports.getResponse = async(req, res) => {
    // Get prompt from either query params or request body
    const prompt = req.query.prompt || req.body.prompt;
    
    if(!prompt){
        return res.status(400).send("Prompt is required");
    }
    
    try {
        const response = await aiService(prompt);
        res.send(response);
    } catch (error) {
        console.error("Error generating AI response:", error);
        res.status(500).send("Error generating AI response");
    }
}