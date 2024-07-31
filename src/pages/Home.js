import React from 'react';
import { Container, Typography, Button, Link } from '@mui/material';
import { motion } from 'framer-motion';
import { makeStyles } from '@mui/styles';
import { Link as RouterLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

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
    padding: '4rem 2rem',
  },
  navbar: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    position: 'fixed',
    top: 0,
    left: 0,
    background: 'linear-gradient(135deg, #1f1c2c, #928dab)',
    zIndex: 1000,
  },
  navLink: {
    color: '#00C9FF',
    textDecoration: 'none',
    fontSize: '1.5rem',
    margin: '0 1rem',
  },
  title: {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 'bold',
    fontSize: '6rem',
    marginBottom: '2rem',
    letterSpacing: '1rem',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '2rem',
    marginBottom: '3rem',
  },
  button: {
    marginTop: '2rem',
    backgroundColor: '#00C9FF',
    color: '#fff',
    padding: '1rem 3rem',
    '&:hover': {
      backgroundColor: '#92FE9D',
    },
  },
  section: {
    padding: '5rem 2rem',
    background: 'linear-gradient(135deg, #1f1c2c, #928dab)',
    color: '#fff',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: '4rem',
    marginBottom: '2rem',
  },
  sectionContent: {
    fontSize: '1.5rem',
    maxWidth: '800px',
    margin: '0 auto',
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.navbar}>
        <Link component={HashLink} smooth to="#home" className={classes.navLink}>
          Home
        </Link>
        <Link component={HashLink} smooth to="#about" className={classes.navLink}>
          About Us
        </Link>
      </div>
      <Container className={classes.root} id="home">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography className={classes.title}>AnalytixPro</Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Typography className={classes.subtitle}>Welcome to the Future of Data Analysis</Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Button className={classes.button} variant="contained" component={RouterLink} to="/upload">
            Get Started
          </Button>
        </motion.div>
      </Container>
      <div className={classes.section} id="about">
        <Typography className={classes.sectionTitle}>About Us</Typography>
        <Typography className={classes.sectionContent}>
          At AnalytixPro, we are dedicated to transforming the way you understand and utilize data. Our mission is to provide
          cutting-edge tools and insights that empower individuals and businesses to make data-driven decisions with confidence.
          We strive to deliver unparalleled accuracy, efficiency, and innovation in every aspect of data analysis and visualization.
        </Typography>
      </div>
    </>
  );
};

export default Home;
