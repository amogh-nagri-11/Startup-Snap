const express = require('express'); 
const cors = require('cors') 
require('dotenv').config(); 

const analyzeRoute = require('./routes/analyze'); 

const app = express(); 
app.use(cors()); 
app.use(express.json()); 

app.use("/analyze", analyzeRoute); 

const PORT = process.env.PORT; 

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 

