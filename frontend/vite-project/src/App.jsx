import React, { useState } from "react";
import VoiceInput from "./components/VoiceInput";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import InsightsPage from "./pages/InsightsPage";

function HomePage() {
  const [userInput, setUserInput] = useState("");

  const handleInputSubmit = async (text) => {
    setUserInput(text);
    try {
      const res = await axios.post("http://127.0.0.1:5000/api/predict", {
        input_text: text,
      });
      console.log(res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-10 text-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        Explainable Heart Disease Prediction
      </h1>

      <VoiceInput onSubmit={handleInputSubmit} />

      {userInput && (
        <div className="mt-6">
          <h2 className="text-lg font-medium">Captured Input:</h2>
          <p className="text-gray-700">{userInput}</p>
        </div>
      )}

      <div className="mt-10">
        <Link
          to="/insights"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          🔍 View Global Insights
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/insights" element={<InsightsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
