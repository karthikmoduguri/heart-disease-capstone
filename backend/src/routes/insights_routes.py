from flask import Blueprint, jsonify

insights_bp = Blueprint('insights', __name__)

@insights_bp.route('/insights', methods=['GET'])
def get_insights():
    insights = [
        {
            "title": "Global Feature Importance (XGBoost)",
            "description": "Key factors that influence overall model predictions.",
            "details": [
                "Chest pain type and oldpeak are most influential features.",
                "Exercise-induced angina increases risk probability.",
                "Resting blood pressure above 150 mmHg raises risk significantly."
            ]
        },
        {
            "title": "Explainable Boosting Machine (EBM)",
            "description": "EBM reveals transparent, additive trends between features and outcomes.",
            "details": [
                "Risk gradually increases beyond age 45.",
                "High cholesterol (above 260 mg/dl) amplifies heart risk.",
                "Normal ECG reduces predicted risk substantially."
            ]
        },
        {
            "title": "Counterfactual Insights (What-If Scenarios)",
            "description": "Possible changes to lower risk based on model explanation.",
            "details": [
                "Reducing cholesterol by 30 mg/dL → risk drops by 18%.",
                "Increased physical activity (3x/week) → risk drops by 15%.",
                "Maintaining resting ECG normal → improves prediction confidence."
            ]
        }
    ]
    return jsonify(insights)
