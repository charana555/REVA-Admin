import React from 'react';
import SignIn from './Signin';
import Test from './Test';
import Appointments from './Appointments';
import Docters from './Docters';
import {BrowserRouter as Router ,Routes ,Route } from "react-router-dom"
import { AuthProvider } from '../Context/AuthContext';

function App() {
  return (
     
     
        <Router>
      <AuthProvider>
          <Routes>
             <Route   path='/test' element = { <Test/> } />
             <Route   path='/appointments' element = { <Appointments/> } />
             <Route   path='/docters' element = { <Docters/> } />
             <Route  exact path='/' element ={ <SignIn/> } />
          </Routes>
      </AuthProvider>
        </Router>
      
   
  )
}

export default App;
