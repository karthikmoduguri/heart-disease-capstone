import React, { useState } from "react";
import axios from "axios";
import ExplanationCard from "../components/ExplanationCard";
import { Link } from "react-router-dom";

const fields = [
  "age", "sex", "cp", "trestbps", "chol",
  "fbs", "restecg", "thalach", "exang",
  "oldpeak", "slope", "ca", "thal"
];

const ManualInput = () => {
  const [form, setForm] = useState({});
  const [result, setResult] = useState(null);
  const [explanation, setExplanation] = useState(null);
  const [loadingWhy, setLoadingWhy] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const buildPayload = () => {
    const payload = {};
    fields.forEach(f => {
      payload[f] = Number(form[f] || 0);
    });
    return payload;
  };

  const handlePredict = async () => {
    setExplanation(null);
    const payload = buildPayload();

    const res = await axios.post(
      "http://127.0.0.1:5000/api/predict",
      payload
    );
    setResult(res.data);
  };

  const handleWhy = async () => {
    setLoadingWhy(true);
    const payload = buildPayload();

    const res = await axios.post(
      "http://127.0.0.1:5000/api/predict-explain",
      payload
    );

    setExplanation(res.data);
    setLoadingWhy(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-10">
      <div className="max-w-3xl mx-auto">

        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-semibold text-blue-700">
            Manual Heart Risk Input
          </h1>
          <Link to="/" className="text-blue-600 hover:underline">
            ← Back
          </Link>
        </div>

        {/* INPUT FORM */}
        <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow-md">
          {fields.map(f => (
            <input
              key={f}
              type="number"
              placeholder={f}
              onChange={(e) => handleChange(f, e.target.value)}
              className="border p-2 rounded"
            />
          ))}

          <button
            onClick={handlePredict}
            className="col-span-2 bg-green-600 text-white py-2 rounded-lg"
          >
            Predict
          </button>
        </div>

        {/* NORMAL RESULT */}
        {result && (
          <div className="mt-6 bg-white p-4 rounded-xl shadow-md text-center">
            <h2 className="text-xl font-semibold">
              {result.prediction === 1 ? "High Risk" : "Low Risk"}
            </h2>
            <p className="text-gray-700 mt-1">
              Probability: {(result.risk_probability * 100).toFixed(2)}%
            </p>

            <button
              onClick={handleWhy}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg"
            >
              🤔 Why?
            </button>
          </div>
        )}

        {/* EXPLANATION */}
        {loadingWhy && (
          <p className="mt-4 text-gray-600 text-center">
            Generating explanation...
          </p>
        )}

        {explanation && (
          <ExplanationCard
            topFeatures={explanation.top_features}
            doctorExplanation={explanation.doctor_explanation}
          />
        )}

      </div>
    </div>
  );
};

export default ManualInput;
