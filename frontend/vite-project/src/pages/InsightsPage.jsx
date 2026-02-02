import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const InsightsPage = () => {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5000/api/insights");
        setInsights(res.data);
      } catch (error) {
        console.error("Error fetching insights:", error);
      }
    };

    fetchInsights();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-blue-700">
          Model Insights & Explainability
        </h1>
        <Link
          to="/"
          className="text-blue-600 hover:underline font-medium text-lg"
        >
          ← Back to Home
        </Link>
      </div>

      {insights.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {insights.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h2>
              <p className="text-gray-600 mb-3">{item.description}</p>
              <ul className="list-disc list-inside text-gray-700">
                {item.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Loading insights...</p>
      )}
    </div>
  );
};

export default InsightsPage;
