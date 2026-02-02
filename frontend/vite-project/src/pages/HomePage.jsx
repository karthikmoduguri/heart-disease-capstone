import React, { useState } from "react";
import VoiceInput from "./components/VoiceInput";
import InputInstructions from "./components/InputInstructions";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage() {
  const [userInput, setUserInput] = useState("");

  const handleInputSubmit = async (text) => {
    setUserInput(text);

    // Backend already expects text
    await axios.post("http://127.0.0.1:5000/api/predict", {
      input_text: text,
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-10">
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-10">
        Explainable Heart Disease Prediction
      </h1>

      <div className="flex gap-8 justify-center">
        {/* Sidebar */}
        <InputInstructions />

        {/* Voice Input */}
        <VoiceInput onSubmit={handleInputSubmit} />
      </div>

      {/* Navigation Buttons */}
      <div className="mt-10 flex justify-center gap-6">
        <Link
          to="/manual-input"
          className="px-5 py-2 bg-green-600 text-white rounded-lg"
        >
          📝 Manual Input
        </Link>

        <Link
          to="/insights"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg"
        >
          🔍 Explainability
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
