const ExplanationCard = ({ topFeatures, doctorExplanation }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-6">
      <h3 className="text-lg font-semibold text-purple-700 mb-3">
        🩺 Why this prediction?
      </h3>

      <p className="text-gray-700 leading-relaxed mb-4">
        {doctorExplanation}
      </p>

      <h4 className="font-medium text-gray-800 mb-2">
        Key contributing factors
      </h4>

      <ul className="list-disc list-inside text-gray-700">
        {topFeatures.map(([feature, impact], idx) => (
          <li key={idx}>
            <b>{feature}</b>{" "}
            <span
              className={impact > 0 ? "text-red-600" : "text-green-600"}
            >
              ({impact > 0 ? "increased risk" : "reduced risk"})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExplanationCard;
