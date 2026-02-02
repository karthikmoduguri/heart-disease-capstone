const RiskBadge = ({ prediction, probability }) => {
  const isHigh = prediction === 1;

  return (
    <div
      className={`p-4 rounded-xl text-white text-center ${
        isHigh ? "bg-red-600" : "bg-green-600"
      }`}
    >
      <h2 className="text-xl font-semibold">
        {isHigh ? "High Risk" : "Low Risk"}
      </h2>
      <p className="text-sm mt-1">
        Probability: {(probability * 100).toFixed(1)}%
      </p>
    </div>
  );
};

export default RiskBadge;
