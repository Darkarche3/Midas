from flask import Flask, request, jsonify
import pickle
import pandas as pd

app = Flask(__name__)

# Load the saved model (same model you're using in Streamlit)
with open("model.pkl", "rb") as model_file:
    model = pickle.load(model_file)

# Function to make predictions
def predict_amount_locked_away(data):
    input_data = pd.DataFrame([data])
    prediction = model.predict(input_data)
    return prediction[0]

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from the frontend (React)
        data = request.get_json()

        # Ensure the data has all required fields
        required_fields = ['Income', 'Gender', 'Location', 'No_of_Children', 'No_of_Family_Members', 'Has_Car', 'Loan_Amount', 'Interest_Rate', 'Months_Left_Debt']
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing data fields"}), 400

        # Make prediction using the data
        prediction = predict_amount_locked_away(data)

        # Return the prediction result as JSON
        return jsonify({'prediction': prediction})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)  # Run Flask app locally on port 5000
