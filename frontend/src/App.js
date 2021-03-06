import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import LoginScreen from './screens/LoginScreen.js';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/login' component={LoginScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
