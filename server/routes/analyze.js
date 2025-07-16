const express = require('express');  
const router = express.Router(); 
const analyzeIdea = require('../services/groqServices.js'); 

router.post('/', async (req, res) => {
    const { idea } = req.body; 

    if (!idea) return res.status(400).json({ error : "Idea not found" }); 

    try {
        const analysis = await analyzeIdea(idea); 
        res.json(analysis); 
    } catch(err) {
        console.log(err); 
        res.status(500).json({ error : "Failed to analyze data"} ); 
    }
}); 

module.exports = router;