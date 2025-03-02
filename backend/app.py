from flask import Flask, request, jsonify
import pickle
import numpy as np
from sqlalchemy import create_engine, text

app = Flask(__name__)

# Load ML Model
with open("model.pkl", "rb") as f:
    model = pickle.load(f)

# Database Connection (Render PostgreSQL)
DB_URL = "postgresql://username:password@your-db-host:5432/your-db-name"
engine = create_engine(DB_URL)

# Create Table (if not exists)
with engine.connect() as conn:
    conn.execute(text("""
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255),
            email VARCHAR(255),
            password VARCHAR(255),
            prediction FLOAT
        )
    """))

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    input_data = np.array([[len(data["username"]), len(data["email"]), len(data["password"])]])
    prediction = model.predict(input_data)[0]

    # Store user data and prediction in the database
    with engine.connect() as conn:
        conn.execute(text("""
            INSERT INTO users (username, email, password, prediction) 
            VALUES (:username, :email, :password, :prediction)
        """), {
            "username": data["username"],
            "email": data["email"],
            "password": data["password"],
            "prediction": prediction
        })

    return jsonify({"prediction": prediction})

# Start the Flask app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)  # Render will use port 5000
