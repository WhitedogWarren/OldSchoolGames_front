import { Navigate } from 'react-router-dom';

import { useContext } from 'react';

import AuthContext from '../../../Contexts/AuthContext';

function ProtectedRoute({ children }) {
    // const isLoggedIn = useContext(AuthContext).authStatus.isLoggedIn;
    // const token = useContext(AuthContext).authStatus.token;
    const { authStatus } = useContext(AuthContext);
    if(!authStatus.token || !authStatus.isLoggedIn) {
        return <Navigate to="/login" ></Navigate>
    }
    return children;
}

export default ProtectedRoute;