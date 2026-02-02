def predict_heart_risk(text_input):
    """
    For now, simulate a prediction based on text input.
    Later, connect this to preprocess + model + explainability.
    """
    # Simple rule-based mockup
    keywords = ["chest pain", "high bp", "tired", "short breath"]
    risk_score = 0.75 if any(k in text_input.lower() for k in keywords) else 0.25

    return {
        "input": text_input,
        "predicted_risk": risk_score,
        "explanation": "Mock explanation - real XGBoost model will be integrated soon."
    }
