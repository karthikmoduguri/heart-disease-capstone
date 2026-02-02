import React from "react";

const InputInstructions = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-[350px]">
      <h2 className="text-xl font-semibold text-blue-700 mb-4">
        🧾 How to give input
      </h2>

      <ul className="space-y-3 text-gray-700 text-sm">
        <li>🎙️ You can speak symptoms in simple English</li>
        <li>✍️ Or type them manually</li>
        <li>📌 Example:</li>

        <div className="bg-gray-100 p-3 rounded-lg italic text-gray-600">
          “55 year old male, chest pain, BP 145, cholesterol 260,
          no diabetes, no exercise pain”
        </div>

        <li>🤖 Our NLP system converts this into model inputs</li>
        <li>⚠️ If any value is not mentioned → it is set to <b>0</b></li>
        <li>🩺 Output shows heart risk level</li>
      </ul>
    </div>
  );
};

export default InputInstructions;
