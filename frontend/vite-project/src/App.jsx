import React, { useState } from "react";
import VoiceInput from "./components/VoiceInput";
import InputInstructions from "./components/InputInstructions";
import ManualInput from "./pages/ManualInput";
import InsightsPage from "./pages/InsightsPage";
import ExplanationCard from "./components/ExplanationCard";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function HomePage() {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState(null);
  const [explanation, setExplanation] = useState(null);
  const [loadingWhy, setLoadingWhy] = useState(false);

  // NORMAL PREDICTION (UNCHANGED)
  const handleInputSubmit = async (text) => {
    setUserInput(text);
    setExplanation(null);

    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/api/predict",
        { input_text: text }
      );
      setResult(res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // WHY BUTTON → EXPLAIN ROUTE
  const handleWhy = async () => {
    if (!userInput) return;

    setLoadingWhy(true);
    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/api/predict-explain",
        { input_text: userInput }
      );
      setExplanation(res.data);
    } catch (error) {
      console.error("Explain error:", error);
    } finally {
      setLoadingWhy(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-10">
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-10">
        Explainable Heart Disease Prediction
      </h1>

      {/* MAIN CONTENT */}
      <div className="flex justify-center gap-8">
        {/* LEFT SIDEBAR */}
        <InputInstructions />

        {/* VOICE INPUT */}
        <VoiceInput onSubmit={handleInputSubmit} />
      </div>

      {/* CAPTURED INPUT */}
      {userInput && (
        <div className="mt-8 text-center">
          <h2 className="text-lg font-medium">Captured Input</h2>
          <p className="text-gray-700 italic mt-2">{userInput}</p>
        </div>
      )}

      {/* NORMAL PREDICTION RESULT */}
      {result && (
        <div className="mt-6 bg-white p-4 rounded-xl shadow-md text-center max-w-md mx-auto">
          <h2 className="text-xl font-semibold">
            {result.prediction === 1 ? "High Risk" : "Low Risk"}
          </h2>
          <p className="text-gray-700 mt-1">
            Probability: {(result.risk_probability * 100).toFixed(2)}%
          </p>

          <button
            onClick={handleWhy}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            🤔 Why?
          </button>
        </div>
      )}

      {/* LOADING EXPLANATION */}
      {loadingWhy && (
        <p className="mt-4 text-center text-gray-600">
          Generating explanation...
        </p>
      )}

      {/* EXPLANATION CARD */}
      {explanation && (
        <ExplanationCard
          topFeatures={explanation.top_features}
          doctorExplanation={explanation.doctor_explanation}
        />
      )}

      {/* NAVIGATION */}
      <div className="mt-12 flex justify-center gap-6">
        <Link
          to="/manual-input"
          className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          📝 Manual Input
        </Link>

        <Link
          to="/insights"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          🔍 Global Insights
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
        <Route path="/manual-input" element={<ManualInput />} />
        <Route path="/insights" element={<InsightsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
