import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1f1c2c, #928dab)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    textAlign: 'center',
    padding: '2rem',
    [theme.breakpoints.down('sm')]: {
      padding: '1rem',
    },
  },
  title: {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 'bold',
    fontSize: '3rem',
    marginBottom: '1rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
      marginBottom: '0.5rem',
    },
  },
  input: {
    marginTop: '2rem',
    marginBottom: '1rem',
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
      marginTop: '1rem',
      marginBottom: '0.5rem',
    },
  },
  button: {
    marginTop: '1rem',
    backgroundColor: '#00C9FF',
    color: '#fff',
    padding: '0.75rem 2rem',
    '&:hover': {
      backgroundColor: '#92FE9D',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '0.5rem',
      padding: '0.5rem 1.5rem',
    },
  },
  link: {
    marginTop: '1rem',
    color: '#00C9FF',
    textDecoration: 'none',
    fontSize: '1.2rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      marginTop: '0.5rem',
    },
  },
}));

const Upload = () => {
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const classes = useStyles();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('File successfully uploaded');
      setUploaded(true);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  return (
    <Container className={classes.root}>
      <Typography className={classes.title}>Upload Your Data</Typography>
      <input type="file" onChange={handleFileChange} className={classes.input} />
      <Button className={classes.button} variant="contained" onClick={handleUpload}>
        Upload
      </Button>
      {uploaded && (
        <Link component={RouterLink} to="/analysis" className={classes.link}>
          View Results
        </Link>
      )}
    </Container>
  );
};

export default Upload;
