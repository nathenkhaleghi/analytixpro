from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400

    if file:
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filepath)

        try:
            # Process the CSV file
            data = pd.read_csv(filepath)
            # Perform analysis or visualization here
            # Example: Get basic statistics
            stats = data.describe().to_dict()
            return jsonify({'message': 'File successfully uploaded', 'stats': stats})
        except Exception as e:
            return jsonify({'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
