import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from './Components/Template/Main/Main';
import Header from './Components/Template/Header/Header';
import Login from './Components/Auth/Login/Login';
import Signup from './Components/Auth/Signup/Signup';
import ProtectedRoute from './Components/routes/ProtectedRoute/ProtectedRoute';
import AuthProvider from './Providers/AuthProvider/AuthProvider';

import './App.css';

function App() {

  return (
    <div className="App">
       <BrowserRouter>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            } />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      
    </div>
  );
}

export default App;