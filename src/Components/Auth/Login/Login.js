import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import useAuth from './../../../hooks/useAuth';
import Button from '../../_utils/Button/Button';

import './Login.scss';

function Login() {
    let formObject = {
        email: '',
        password: ''
    }
    const axios = require('axios').default;
    const [inputValue, setInputValue] = useState(formObject);
    const { onLogin } = useAuth();
    const navigate = useNavigate();

    function handleSubmit(event) {
        //////
        // TODO : check fields
        //////
        event.preventDefault();
        axios.post('/api/auth/login', inputValue)
        .then(response => {
            onLogin({isLoggedIn: true, user: response.data.user, token: response.data.token});
            navigate("/home");
        })
        .catch(error => {
            console.log(error);
        })
    }

    function valueChange(event) {
        let inputKey = event.target.id.substring(event.target.id.indexOf('-') + 1);
        formObject[inputKey] = event.target.value;
        setInputValue(formObject);
    }
    
    return (
        <div className="Login">
            <form className="login-form">
                <h2>Connexion</h2>
                <div className="field-box">
                    <div className="login-form-email login-form__fields">
                        <div className="login-form__labels">
                            <label htmlFor="login-email">E-mail : </label>
                        </div>
                        <div className="login-form__inputs">
                            <input type="text" name="login_email" id="login-email" onChange={valueChange} />
                        </div>
                    </div>
                    <div className="login-form-pseudo login-form__fields">
                        <div className='login-form__labels'>
                            <label htmlFor="login-password">Mot de passe : </label>
                        </div>
                        <div className="login-form__inputs">
                            <input type="text" name="login_password" id="login-password" onChange={valueChange} />
                        </div>
                    </div>
                    <Button content="Valider" clickHandler={handleSubmit} />
                </div>
            </form>
        </div>
    )
}

export default Login;