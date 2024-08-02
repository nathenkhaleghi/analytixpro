from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import pandas as pd
import os
import matplotlib.pyplot as plt
from io import StringIO
import logging

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})  # Allow all origins for testing

# Set up logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s %(levelname)s: %(message)s')

# Directories to save uploaded and processed files
UPLOAD_FOLDER = 'uploads'
PROCESSED_FOLDER = 'processed'
CHARTS_FOLDER = 'charts'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)
os.makedirs(CHARTS_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_file():
    logging.debug('Received a file upload request.')
    if 'file' not in request.files:
        logging.error('No file part in the request.')
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        logging.error('No selected file.')
        return jsonify({'error': 'No selected file'}), 400
    
    if file and file.filename.endswith('.csv'):
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)
        logging.debug(f'File saved to {file_path}')
        
        try:
            processed_data = process_file(file_path)
            logging.debug('File processed successfully.')
            
            processed_file_path = os.path.join(PROCESSED_FOLDER, 'processed_data.json')
            processed_data.to_json(processed_file_path, orient='split')
            logging.debug(f'Processed data saved to {processed_file_path}')
            
            return jsonify({'message': 'File successfully uploaded and processed'}), 200
        except Exception as e:
            logging.error(f'Error processing file: {e}', exc_info=True)
            return jsonify({'error': 'Error processing file'}), 500
    else:
        logging.error('Unsupported file format.')
        return jsonify({'error': 'Unsupported file format'}), 400

@app.route('/analysis', methods=['GET', 'POST'])
def get_analysis():
    processed_file_path = os.path.join(PROCESSED_FOLDER, 'processed_data.json')
    
    if os.path.exists(processed_file_path):
        try:
            data = pd.read_json(processed_file_path, orient='split')
            summary = {
                'num_rows': len(data),
                'num_columns': len(data.columns),
                'columns': data.columns.tolist(),
                'column_types': {k: str(v) for k, v in data.dtypes.to_dict().items()}
            }
            description = data.describe().to_dict()
            
            # Capture info as a string
            buffer = StringIO()
            data.info(buf=buffer, memory_usage='deep')
            info = buffer.getvalue()

            return jsonify({
                'summary': summary,
                'description': description,
                'info': info
            })
        except Exception as e:
            logging.error(f'Error reading processed data: {e}', exc_info=True)
            return jsonify({'error': 'Error reading processed data'}), 500
    else:
        logging.error('No processed data found.')
        return jsonify({'error': 'No processed data found'}), 404

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s %(levelname)s: %(message)s')

@app.route('/visualization/<chart_type>', methods=['GET'])
def get_chart(chart_type):
    logging.debug(f"Requested chart type: {chart_type}")

    processed_file_path = os.path.join(PROCESSED_FOLDER, 'processed_data.json')
    
    if not os.path.exists(processed_file_path):
        logging.error('No processed data found.')
        return jsonify({'error': 'No processed data found'}), 404
    
    try:
        data = pd.read_json(processed_file_path, orient='split')
        
        if chart_type == 'bar':
            fig, ax = plt.subplots(figsize=(10, 6))
            data.mean().plot(kind='bar', ax=ax)
            ax.set_title('Bar Chart')
            chart_path = os.path.join(CHARTS_FOLDER, 'bar_chart.png')
        elif chart_type == 'line':
            fig, ax = plt.subplots(figsize=(10, 6))
            data.plot(kind='line', ax=ax)
            ax.set_title('Line Chart')
            chart_path = os.path.join(CHARTS_FOLDER, 'line_chart.png')
        elif chart_type == 'pie':
            if len(data.columns) == 1:
                fig, ax = plt.subplots(figsize=(8, 8))
                data.iloc[:, 0].value_counts().plot(kind='pie', ax=ax, autopct='%1.1f%%')
                ax.set_ylabel('')
                ax.set_title('Pie Chart')
                chart_path = os.path.join(CHARTS_FOLDER, 'pie_chart.png')
            else:
                logging.error('Pie chart requires a single column of data.')
                return jsonify({'error': 'Pie chart requires a single column of data'}), 400
        else:
            logging.error('Unsupported chart type requested.')
            return jsonify({'error': 'Unsupported chart type'}), 400
        
        logging.debug(f"Saving chart to {chart_path}")
        fig.savefig(chart_path)
        plt.close(fig)
        logging.debug("Chart saved successfully.")
        
        return send_from_directory(CHARTS_FOLDER, f'{chart_type}_chart.png')
    except Exception as e:
        logging.error(f"Error generating chart: {e}", exc_info=True)
        return jsonify({'error': f'Error generating chart: {e}'}), 500


def process_file(file_path):
    # Read the file
    data = pd.read_csv(file_path)
    logging.debug(f'Dataset loaded with {data.shape[0]} rows and {data.shape[1]} columns')
    
    # Example processing: Removing rows with missing values
    data = data.dropna()
    logging.debug('Missing values removed.')
    
    return data

if __name__ == '__main__':
    app.run(debug=True)
