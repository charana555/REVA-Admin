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
             <Route   path='/dash' element = { <Dash/> } />
             <Route  exact path='/' element ={ <SignIn/> } />
          </Routes>
      </AuthProvider>
        </Router>
      
   
  )
}

export default App;
