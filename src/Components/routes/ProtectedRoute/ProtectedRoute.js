import { useNavigate, Navigate } from 'react-router-dom';
import { useContext } from 'react';

import AuthContext from '../../../Contexts/AuthContext';

function ProtectedRoute({ children }) {
    const axios = require('axios').default;
    const { authStatus, setAuthStatus } = useContext(AuthContext);
    const navigate = useNavigate();
    async function getUserInfos() {
        const apiResponse = await axios.get('/api/user/me', {headers: {'Authorization': 'bearer ' + window.localStorage.getItem('oldschoolgames')}})
        .catch(error => {
            console.log(error);
            return false;
        });
        return apiResponse.data;
    }
    // if user is not connected, but there is a token in localStorage
    if(!authStatus.isLoggedIn && window.localStorage.getItem('oldschoolgames')) {
        //console.log('token trouvé');
        // get user infos
        getUserInfos().then(apiData => {
            if(apiData) { //API sends a success
                setAuthStatus({isLoggedIn: true, user: apiData, token: window.localStorage.getItem('oldschoolgames')});
                navigate("/home");
            }
            else { // API sends an error
                window.localStorage.removeItem('oldschoolgames');
                return <Navigate to="/login" ></Navigate>
            }
        });
    }
    // if user is not connected, and there is no token in localStorage
    if(!authStatus.token && !window.localStorage.getItem('oldschoolgames')) {
        // redirect to login
        return <Navigate to="/login" ></Navigate>
    }
    // if user is connected
    return children;
}

export default ProtectedRoute;