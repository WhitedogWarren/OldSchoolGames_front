import { BrowserRouter, Routes, Route } from "react-router-dom";


import AuthProvider from './Providers/AuthProvider';
import IoSocketProvider from "./Providers/IoSocketProvider";

import Main from './Components/Template/Main/Main';
import Header from './Components/Template/Header/Header';
import Login from './Components/Auth/Login/Login';
import Signup from './Components/Auth/Signup/Signup';
import ProtectedRoute from './Components/routes/ProtectedRoute/ProtectedRoute';
import Morpion from './Components/routes/Morpion/Morpion';
import Home from "./Components/routes/Home/Home";

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
                <IoSocketProvider>
                  <Main />
                </IoSocketProvider>
              </ProtectedRoute>
            } >
              <Route path="home" element={<Home />} />
              <Route path="morpion" element={<Morpion />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;