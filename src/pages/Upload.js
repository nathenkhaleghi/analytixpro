import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(res.data.message);
    } catch (err) {
      if (err.response) {
        // Server responded with a status other than 200 range
        setMessage(err.response.data.message);
      } else if (err.request) {
        // Request was made but no response received
        setMessage('No response received from server');
      } else {
        // Something else happened while setting up the request
        setMessage('Error: ' + err.message);
      }
    }
  };

  return (
    <div>
      <h2>Upload CSV File</h2>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={onChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Upload;
