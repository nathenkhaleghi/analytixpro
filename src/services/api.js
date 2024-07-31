// src/services/api.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return await axios.post(`${API_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const cleanData = async (filename) => {
  return await axios.post(`${API_URL}/clean`, { filename });
};

export const analyzeData = async (filename) => {
  return await axios.post(`${API_URL}/analyze`, { filename });
};

export const visualizeData = async (filename) => {
  return await axios.post(`${API_URL}/visualize`, { filename });
};
