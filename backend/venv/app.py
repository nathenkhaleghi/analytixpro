from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import os
import io

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
data = None  # Define data as a global variable to be used in both endpoints

@app.route('/upload', methods=['POST'])
def upload_file():
    global data
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
            
            # Cleaning the data
            data.dropna(inplace=True)  # Example: Drop missing values

            return jsonify({'message': 'File successfully uploaded'})
        except Exception as e:
            return jsonify({'message': str(e)}), 500

@app.route('/analysis', methods=['GET'])
def get_analysis():
    global data
    if data is None:
        return jsonify({'message': 'No data available'}), 400

    try:
        # Perform analysis
        description = data.describe().to_dict()
        summary = {
            'num_rows': data.shape[0],
            'num_columns': data.shape[1],
            'columns': data.columns.tolist(),
            'column_types': data.dtypes.astype(str).to_dict()
        }
        buffer = io.StringIO()
        data.info(buf=buffer)
        info_str = buffer.getvalue()

        return jsonify({'description': description, 'summary': summary, 'info': info_str})
    except Exception as e:
        return jsonify({'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
