import { useState } from 'react';
//import { useNavigate } from "react-router-dom";

import AuthContext from '../../Contexts/AuthContext';

function AuthProvider({ children }) {
  const [getAuthStatus, setAuthStatus] = useState({isLoggedIn: false, user:null, token:null});
  //const navigate = useNavigate();
  
  function handleLogin(data, callback) {
    if(data.isLoggedIn && data.token && data.user) {
      //localStorage.setItem('oldschoolgames', data.token);
      setAuthStatus(data);
      //navigate("/");
      //callback();
    }
  }

  function handleLogout() {
    setAuthStatus({isLoggedIn: false, user: null, token: null});
    //localStorage.removeItem('oldschoolgames');
    //navigate("/login");
  }

  const value = {
      authStatus: getAuthStatus,
      onLogin: handleLogin,
      onLogout: handleLogout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;