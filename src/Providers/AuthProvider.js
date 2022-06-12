import { useState } from 'react';

import AuthContext from '../Contexts/AuthContext';

function AuthProvider({ children }) {
  const [getAuthStatus, setAuthStatus] = useState({isLoggedIn: false, user:null, token:null});
  
  function handleLogin(data) {
    if(data.isLoggedIn && data.token && data.user) {
      localStorage.setItem('oldschoolgames', data.token);
      setAuthStatus(data);
    }
  }

  function handleLogout() {
    setAuthStatus({isLoggedIn: false, user: null, token: null});
    localStorage.removeItem('oldschoolgames');
  }

  const value = {
      authStatus: getAuthStatus,
      setAuthStatus,
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
