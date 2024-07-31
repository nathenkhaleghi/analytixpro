import React from 'react';
import { Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

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
  content: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '1.2rem',
    maxWidth: '800px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      maxWidth: '100%',
    },
  },
}));

const About = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography className={classes.title}>About Us</Typography>
      <Typography className={classes.content}>
        At AnalytixPro, we are dedicated to transforming the way you understand and utilize data. Our mission is to provide
        cutting-edge tools and insights that empower individuals and businesses to make data-driven decisions with confidence.
        We strive to deliver unparalleled accuracy, efficiency, and innovation in every aspect of data analysis and visualization.
      </Typography>
    </Container>
  );
};

export default About;
