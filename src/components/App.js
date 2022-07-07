import React from 'react';
import SignIn from './Signin';
import Dash from './Dash';
import {BrowserRouter as Router ,Routes ,Route } from "react-router-dom"
import { AuthProvider } from '../Context/AuthContext';

function App() {
  return (
     
     
        <Router>
      <AuthProvider>
          <Routes>
             <Route exact path='/' element = { <Dash/> } />
             <Route path='/signin' element ={ <SignIn/> } />
          </Routes>
      </AuthProvider>
        </Router>
      
   
  )
}

export default App;
