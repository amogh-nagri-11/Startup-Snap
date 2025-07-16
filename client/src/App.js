import { useState } from "react"; 
import ReactMarkdown from "react-markdown";
import axios from "axios"; 
import "./App.css"; 

function App() {
  const [idea, setIdea] = useState(""); 
  const [response, setResponse] = useState(""); 
  const [loading, setLoading] = useState(false); 

  const handleAnalyze = async() => {
    if (!idea.trim()) return; 

    setLoading(true);
    setResponse(""); 

    try {
      const res = await axios.post("http://localhost:4000/analyze", { idea }); 
      setResponse(res.data); 
    } catch (err) {
      setResponse("Error: " + err.message); 
    }

    setLoading(false); 
  };

  return (
    <div className="app" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <h1>StartupSnap</h1>

      <textarea 
        placeholder="Describe your startup idea..."  
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
      />

      <button onClick={handleAnalyze} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Idea"}
      </button>

      <div className="response-box">
        <ReactMarkdown>{response}</ReactMarkdown>
      </div>
    </div>
  );
}

export default App; 