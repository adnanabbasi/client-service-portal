import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-5'>
        <Container>
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/admin/userlist' component={UserListScreen} exact />
          <Route
            path='/admin/userlist/:pageNumber'
            component={UserListScreen}
            exact
          />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
