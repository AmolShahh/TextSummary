from summarizer import Summarizer,TransformerSummarizer
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

GPT2_model = TransformerSummarizer(transformer_type="GPT2",transformer_model_key="gpt2-medium")

@app.route("/api/summarize", methods=["POST"])
def summarize():
    text = request.args["text"]
    full = ''.join(GPT2_model(text, min_length=70))
    
    response = jsonify({'summary': full})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
  app.run(host="localhost", port=3001)
