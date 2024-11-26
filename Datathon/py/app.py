from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import creds

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes globally

# Set your OpenAI API key
openai.api_key = creds.api_key

@app.route("/chat", methods=["POST", "OPTIONS"])
def chat():
    if request.method == "OPTIONS":
        # Handle pre-flight CORS request
        return jsonify({}), 200
    
    data = request.get_json()
    user_message = data.get("message", "")

    # Specify the prompt that focuses on young adults entering the workforce
    legal_prompt = f"""
    You are a Spanish labor lawyer with expertise in labor laws, rights, and regulations, specifically for young adults who are starting to work. 
    You provide clear, easy-to-understand legal advice for individuals between 18 and 25 years old who are just entering the workforce in Spain.
    A client has approached you with the following query:
    '{user_message}'
    Provide a detailed, friendly, and professional legal response in Spanish, suitable for someone who is new to the workforce and may not be familiar with legal terminology.
    """

    try:
        # Call GPT-3.5 with the modified prompt
        response = openai.completions.create(
            model="gpt-3.5-turbo",  # or "gpt-4" if you want to use GPT-4
            prompt=legal_prompt,
            max_tokens=150  # Adjust max_tokens as needed
        )

        bot_reply = response.choices[0].text.strip()  # Extracting the response
        return jsonify({"reply": bot_reply})

    except Exception as e:
        print("Error:", e)
        return jsonify({"reply": "Error: Unable to connect to OpenAI API"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
