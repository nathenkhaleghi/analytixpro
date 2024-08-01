// src/pages/Upload.js

import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { motion } from 'framer-motion'; // Import framer-motion
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    width: '100vw',
    background: 'inherit', // Ensure it inherits the global background color
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    textAlign: 'center',
    padding: '2rem',
    boxSizing: 'border-box',
    overflow: 'hidden', // Prevents potential overflow causing a different background
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
  description: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    maxWidth: '600px',
    lineHeight: '1.5',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      marginBottom: '1.5rem',
    },
  },
  input: {
    marginTop: '2rem',
    marginBottom: '1rem',
    [theme.breakpoints.down('sm')]: {
      marginTop: '1rem',
      marginBottom: '0.5rem',
    },
    '& input': {
      color: '#fff',
    },
  },
  button: {
    marginTop: '1rem',
    backgroundColor: '#61dafb',
    color: '#282c34',
    padding: '0.75rem 2rem',
    borderRadius: '5px',
    fontSize: '1rem',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#21a1f1',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '0.5rem',
      padding: '0.5rem 1.5rem',
    },
  },
  link: {
    marginTop: '2rem',
    backgroundColor: '#21a1f1',
    color: '#fff',
    padding: '0.75rem 2rem',
    borderRadius: '5px',
    textDecoration: 'none',
    fontSize: '1.2rem',
    display: 'inline-block',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#61dafb',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      marginTop: '1rem',
      padding: '0.5rem 1.5rem',
    },
  },
  resultMessage: {
    marginTop: '1rem',
    fontSize: '1.2rem',
    color: '#fff',
    maxWidth: '600px',
    lineHeight: '1.5',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
}));

const Upload = () => {
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const classes = useStyles();

  // Define animation variants
  const fadeInVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

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
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 1 }}
        variants={fadeInVariants}
      >
        <Typography className={classes.title}>Upload Your Data</Typography>
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 1, delay: 0.5 }}
        variants={fadeInVariants}
      >
        <Typography className={classes.description}>
          Please upload your dataset. It will be processed and analyzed to provide insights you can view. Ensure your file is in CSV format for the best results.
        </Typography>
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 1, delay: 1 }}
        variants={fadeInVariants}
      >
        <input type="file" onChange={handleFileChange} className={classes.input} />
        <Button className={classes.button} variant="contained" onClick={handleUpload}>
          Upload
        </Button>
      </motion.div>
      {uploaded && (
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 1.5 }}
          variants={fadeInVariants}
        >
          <Typography className={classes.resultMessage}>
            Your data has been preprocessed and analyzed. Click here to view results.
          </Typography>
          <Link component={RouterLink} to="/analysis" className={classes.link}>
            View Results
          </Link>
        </motion.div>
      )}
    </Container>
  );
};

export default Upload;
