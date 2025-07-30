from flask import Flask, request, jsonify
import google.generativeai as genai
import os

app = Flask(__name__)

# Set your Gemini API key (use an environment variable for security in production)
genai.configure(api_key=os.getenv("GEMINI_API_KEY", "AIzaSyBJKGg5yx8IncYDoI3BCjJWS9ZxsIcgVW8"))

@app.route('/rewrite', methods=['POST'])
def rewrite():
    data = request.json
    text = data.get('text', '')
    if not text:
        return jsonify({'error': 'No text provided'}), 400

    prompt = (
        "Rewrite the following as a first-person introduction, without mentioning my name, and make it sound natural and personal. "
        "Only output the introduction text, with no preamble or explanation:\n\n"
        f"{text}\n\nFirst-person introduction:"
    )

    try:
        model = genai.GenerativeModel('gemini-2.0-flash')
        response = model.generate_content(prompt)
        rewritten = response.text.strip()
        return jsonify({'summary': rewritten})
    except Exception as e:
        print("Gemini API error:", e)
        return jsonify({'error': str(e)}), 500

# The following block is for development only and should not be used in production.
if __name__ == '__main__':
    app.run(port=5000)