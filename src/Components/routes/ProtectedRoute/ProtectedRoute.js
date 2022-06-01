import { Navigate } from 'react-router-dom';

import { useContext } from 'react';

import AuthContext from '../../../Contexts/AuthContext';

function ProtectedRoute({ children }) {
    const isLoggedIn = useContext(AuthContext).authStatus.isLoggedIn;
    const token = useContext(AuthContext).authStatus.token;

    if(!token || !isLoggedIn) {
        return <Navigate to="/login" replace></Navigate>
    }
    return children;
}

export default ProtectedRoute;