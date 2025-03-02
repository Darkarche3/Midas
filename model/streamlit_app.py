import streamlit as st
import pandas as pd
import pickle
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

# Load the saved model
with open("model.pkl", "rb") as model_file:
    model = pickle.load(model_file)

# Function to make predictions
def predict_amount_locked_away(income, gender, location, num_children, num_family_members, has_car, loan_amount, interest_rate, months_left_debt):
    # Prepare the input data in the same format as expected by the model
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
    
    # Use the model to make a prediction
    prediction = model.predict(input_data)
    return prediction[0]

# Streamlit app interface
st.title("Financial Tool: Amount Locked Away Prediction")

# Input fields for user
income = st.number_input("Income", min_value=0)
gender = st.selectbox("Gender", ["Male", "Female"])
location = st.selectbox("Location", ["City", "Suburb", "Rural"])
num_children = st.number_input("Number of Children", min_value=0, step=1)
num_family_members = st.number_input("Number of Family Members", min_value=1, step=1)
has_car = st.selectbox("Do you have a car?", ["Yes", "No"])
loan_amount = st.number_input("Loan Amount", min_value=0.0, step=1000.0)
interest_rate = st.number_input("Interest Rate (%)", min_value=0.0, step=0.1)
months_left_debt = st.number_input("Months Left in Debt", min_value=1, step=1)

# Button to make prediction
if st.button("Predict"):
    prediction = predict_amount_locked_away(income, gender, location, num_children, num_family_members, has_car, loan_amount, interest_rate, months_left_debt)
    st.write(f"Predicted Amount Locked Away: ${prediction:.2f}")
