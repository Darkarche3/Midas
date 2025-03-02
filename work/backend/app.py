from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import pickle
import pandas as pd

# Load the saved model
with open("model.pkl", "rb") as model_file:
    model = pickle.load(model_file)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def home():
    return 'Flask Backend Running'

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Extract form data
        income = float(request.form['income'])
        gender = request.form['gender']
        location = request.form['location']
        num_children = int(request.form['num_children'])
        num_family_members = int(request.form['num_family_members'])
        has_car = request.form['has_car']
        loan_amount = float(request.form['loan_amount'])
        interest_rate = float(request.form['interest_rate'])
        months_left_debt = int(request.form['months_left_debt'])

        # Prepare input data as DataFrame
        input_data = pd.DataFrame({
            "Income": [income],
            "Gender": [gender],
            "Location": [location],
            "No_of_Children": [num_children],
            "No_of_Family_Members": [num_family_members],
            "Has_Car": [has_car],
            "Loan_Amount": [loan_amount],
            "Interest_Rate": [interest_rate],
            "Months_Left_Debt": [months_left_debt]
        })

        # Make prediction
        prediction = model.predict(input_data)

        return jsonify({'prediction': float(prediction[0])})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
