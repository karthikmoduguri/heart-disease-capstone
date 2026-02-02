from flask import Blueprint, request, jsonify
from controllers.prediction_controller import predict_heart_risk

api_routes = Blueprint("api_routes", __name__)

@api_routes.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    text_input = data.get("input_text", "")
    
    # Call controller
    response = predict_heart_risk(text_input)
    return jsonify(response)
