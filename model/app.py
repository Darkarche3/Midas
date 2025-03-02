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
    return "Welcome to the prediction API"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Extract JSON data from the request
        data = request.json
        income = float(data['income'])
        gender = data['gender']
        location = data['location']
        num_children = int(data['numChildren'])
        num_family_members = int(data['numFamilyMembers'])
        num_vehicles = int(data['numVehicles'])
        debt = float(data['debt'])
        

        # Prepare input data as DataFrame
        input_data = pd.DataFrame({
            "Income": [income],
            "Gender": [gender],
            "Location": [location],
            "No_of_Children": [num_children],
            "No_of_Family_Members": [num_family_members],
            "No_of_Vehicles": [num_vehicles],
            "Debt": [debt],
            "Has_Car": 'Yes',
            "Loan_Amount": [debt],
            "Months_Left_Debt": 24,
            "Interest_Rate": 10,
        })

        # Make prediction
        prediction = model.predict(input_data)
        

        return jsonify({'prediction': float(prediction[0])})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
