import { useState } from 'react';

import './Login.css';
import useAuth from './../../../hooks/useAuth'

function Login() {
    let formObject = {
        email: '',
        password: ''
    }
    const [inputValue, setInputValue] = useState(formObject);
    const { onLogin } = useAuth();

    function handleSubmit(event) {
        event.preventDefault();
        const axios = require('axios').default;
        axios.post('/api/auth/login', inputValue)
        .then(response => {
            //console.log(response)
            onLogin({isLoggedIn: true, user: response.data.user, token: response.data.token});
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
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Connexion</h2>
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
                <button type='submit'>Entrer</button>
            </form>
        </div>
    )
}

export default Login;