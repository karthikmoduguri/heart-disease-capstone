import React, { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const VoiceInput = ({ onSubmit }) => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [manualText, setManualText] = useState("");

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  const handleSubmit = () => {
    const inputText = transcript || manualText;
    if (inputText.trim()) {
      onSubmit(inputText);
      resetTranscript();
      setManualText("");
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md w-[500px] mx-auto mt-10 text-center">
      <h2 className="text-xl font-semibold mb-4">🩺 Heart Risk Input</h2>

      <div className="space-y-3">
        <button
          onClick={SpeechRecognition.startListening}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          🎙️ {listening ? "Listening..." : "Start Voice Input"}
        </button>
        <button
          onClick={SpeechRecognition.stopListening}
          className="bg-gray-400 text-white px-4 py-2 rounded-lg ml-2"
        >
          Stop
        </button>

        <p className="italic text-gray-600">{transcript}</p>

        <input
          type="text"
          placeholder="Or type symptoms here..."
          value={manualText}
          onChange={(e) => setManualText(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg w-full"
        />

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default VoiceInput;
