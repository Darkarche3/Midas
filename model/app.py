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
def predict_amount_locked_away(gender, location, has_car, income, num_children, num_family_members):
    # Prepare the input data in the same format as expected by the model
    input_data = pd.DataFrame({
        "Gender": [gender],
        "Location": [location],
        "Has_Car": [has_car],
        "Income": [income],
        "No_of_Children": [num_children],
        "No_of_Family_Members": [num_family_members]
    })
    
    # Use the model to make a prediction
    prediction = model.predict(input_data)
    return prediction[0]

# Streamlit app interface
st.title("Financial Tool: Amount Locked Away Prediction")

# Input fields for user
gender = st.selectbox("Gender", ["Male", "Female"])
location = st.selectbox("Location", ["City", "Suburb", "Rural"])
has_car = st.selectbox("Do you have a car?", ["Yes", "No"])
income = st.number_input("Income", min_value=0)
num_children = st.number_input("Number of Children", min_value=0, step=1)
num_family_members = st.number_input("Number of Family Members", min_value=1, step=1)

# Button to make prediction
if st.button("Predict"):
    prediction = predict_amount_locked_away(gender, location, has_car, income, num_children, num_family_members)
    st.write(f"Predicted Amount Locked Away: ${prediction:.2f}")