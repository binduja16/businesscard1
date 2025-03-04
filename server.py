from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Fetch API Key (Check if it's None)
openai_api_key = os.getenv("OPENAI_API_KEY")
if not openai_api_key:
    raise ValueError("❌ OPENAI_API_KEY is missing. Set it in .env file.")

# Initialize OpenAI client
client = openai.OpenAI(api_key=openai_api_key)

@app.route('/', methods=['GET'])
def home():
    return "✅ Flask server is running. Use /generate-business-card for API requests."

@app.route('/generate-business-card', methods=['POST'])
def generate_business_card():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "❌ No JSON data received"}), 400

        name = data.get("name", "John Doe")
        email = data.get("email", "johndoe@example.com")
        phone = data.get("phone", "+1234567890")
        job_title = data.get("job_title", "Software Engineer")
        company = data.get("company", "Tech Corp")

        print(f"✅ Received Data: {data}")  # Debugging

        # OpenAI API Call (Check if GPT-4 is available, else use GPT-3.5)
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",  # Change to "gpt-4" if you have access
            messages=[{"role": "user", "content": f"Create a business card: Name: {name}, Job: {job_title}, Email: {email}, Phone: {phone}, Company: {company}."}]
        )

        print(f"✅ OpenAI Response: {response}")  # Debugging

        generated_text = response.choices[0].message.content
        return jsonify({"business_card": generated_text})

    except Exception as e:
        print(f"❌ Error: {str(e)}")  # Debugging
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
