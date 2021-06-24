import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from './components/HomeScreen'
import LoginScreen from './components/LoginScreen'
import RegisterScreen from './components/RegisterScreen'
import EditScreen from './components/EditScreen'
import UserList from './components/UserList'

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/user/list" component={UserList} />
          <Route path="/register" component={RegisterScreen} />

          <Route path='/user/:id/edit' component={EditScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route exact path="/" component={HomeScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
