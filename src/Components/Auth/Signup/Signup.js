import { useContext, useState } from 'react';

import './Signup.css';
import AuthContext from './../../../Contexts/AuthContext';

function Signup() {
    let formObject = {
        pseudo: '',
        email: '',
        password: '',
        password_confirm: ''
    }

    const [inputValue, setInputValue] = useState(formObject);
    const { onLogin } = useContext(AuthContext);
    
    function handleSubmit(event) {
        event.preventDefault();
        
        if(!checkForm()) {
            return;
        }
        
        document.getElementsByClassName('error-logger')[0].innerHTML = '';
        for(let input of document.getElementsByTagName('input')) {
            input.classList.remove('invalid');
        }
        //////
        // TODO : prévalidation JS
        //////
        const axios = require('axios').default;
        axios.post('/api/auth/signup', inputValue)
        .then(response => {
            console.log(response.data.message);
            console.log(response.data.user);
            console.log(response.data.token)
            onLogin({isLoggedIn: true, user: response.data.user, token: response.data.token})
        })
        .catch(error => {
            console.log(error.response.data);
            //////
            // TODO : traitement des erreurs de la réponse
            //////
            let errorMessage = '';
            document.getElementsByClassName('error-logger')[0].style.display = 'none';
            let fieldTranslation = new Map();
            fieldTranslation.set('pseudo', 'pseudo');
            fieldTranslation.set('email', 'e-mail');
            fieldTranslation.set('password', 'mot de passe');
            fieldTranslation.set('password_confirm', 'confirmation du mot de passe');
            fieldTranslation.set('password_mismatch', 'mot de passe et confirmation différents');
            if(error.response.data.emptyFields) {
                if(error.response.data.emptyFields.length === 1) {
                    errorMessage += `Vous n'avez pas rempli le champ ${fieldTranslation.get(error.response.data.emptyFields[0])}<br>test`;
                }
                if(error.response.data.emptyFields.length > 1) {
                    errorMessage += 'Les champs suivants n\'ont pas été remplis :<br>';
                    for(let field of error.response.data.emptyFields) {
                        errorMessage += `- ${fieldTranslation.get(field)}<br>`;
                    }
                }
                for(let field of error.response.data.emptyFields) {
                    document.getElementById('signup-' + field).classList.add('invalid');
                }
            }
            if(error.response.data.invalidFields) {
                if(errorMessage !== '') {
                    errorMessage += '<br>';
                }
                if(error.response.data.invalidFields.length === 1 && error.response.data.invalidFields[0] !== 'password_mismatch') {
                    errorMessage += `Le champ ${fieldTranslation.get(error.response.data.invalidFields[0])} est invalide.`;
                }
                if(error.response.data.invalidFields.length === 1 && error.response.data.invalidFields[0] === 'password_mismatch') {
                    errorMessage += 'Le mot de passe et sa confirmation sont différents';
                }
                if(error.response.data.invalidFields.length > 1) {
                    errorMessage += 'Les champs suivants sont invalides :<br>';
                    for(let field of error.response.data.invalidFields) {
                        errorMessage += `- ${fieldTranslation.get(field)}<br>`;
                    }
                }
                for(let field of error.response.data.invalidFields) {
                    if(field !== 'password_mismatch') {
                        document.getElementById('signup-' + field).classList.add('invalid');
                    }
                    if(field === 'password_mismatch') {
                        document.getElementById('signup-password').classList.add('invalid');
                        document.getElementById('signup-password_confirm').classList.add('invalid');
                    }
                }
            }
            if(errorMessage !== '') {
                console.log(errorMessage);
                document.getElementsByClassName('error-logger')[0].style.display = 'block';
                document.getElementsByClassName('error-logger')[0].innerHTML = errorMessage;
            }
        })
    }

    function valueChange(event) {
        let inputKey = event.target.id.substring(event.target.id.indexOf('-') + 1);
        formObject[inputKey] = event.target.value;
        setInputValue(formObject);
        //console.log(inputValue);
        //////
        // TODO : prévalidation JS
        //////
        checkForm();
    }

    function checkForm() {
        let errorMessage = '';
        document.getElementsByClassName('error-logger')[0].innerHTML = '';
        document.getElementsByClassName('error-logger')[0].style.display = 'none';
        for(let input of document.getElementsByTagName('input')) {
            input.classList.remove('invalid');
        }
        const pseudoRegexp = /[0-9a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð.' \-_]+$/u;
        const emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const passwordRegexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[+\-/=!@_&*])[0-9a-zA-Z+\-/=!@_&*]{8,}$/;
        //console.log(inputValue);
        if(inputValue.pseudo !== '' && !pseudoRegexp.test(inputValue.pseudo)) {
            errorMessage += 'Pseudo invalide !<br>';
            errorMessage += 'Le pseudo ne peut contenir que des lettres, des chiffres, et des caractère spéciaux parmi . \' - et _<br>';
            document.getElementById('signup-pseudo').classList.add('invalid');
        }
        if(inputValue.email !== '' && !emailRegexp.test(inputValue.email)) {
            errorMessage += 'e-mail invalide !<br>';
            document.getElementById('signup-email').classList.add('invalid');
        }
        if(inputValue.password !== '' && !passwordRegexp.test(inputValue.password)) {
            errorMessage += 'Mot de passe invalide !<br>Il doit contenir :<br><span';
            if(!inputValue.password.match(/[a-z]/)) {
                errorMessage += ' style="color:red"';
            }
            errorMessage += '>- Une minuscule</span><br><span';
            if(!inputValue.password.match(/[A-Z]/)) {
                errorMessage += ' style="color:red"';
            }
            errorMessage += '>- Une majuscule</span><br><span';
            if(!inputValue.password.match(/[0-9]/)) {
                errorMessage += ' style="color:red"';
            }
            errorMessage += '>- Un chiffre</span><br><span';
            if(!inputValue.password.match(/[+\-/=!@_&*]/)) {
                errorMessage += ' style="color:red"';
            }
            //traitement des caractères interdits
            errorMessage += '>- Un caractère spécial parmi + - / * = ! @ _ &</span><br><span';
            if(inputValue.password.match(/[^0-9a-zA-Z+\-/=!@_&*]/)) {
                console.log('caractère interdit');
                errorMessage += ' style="color:red"';
            }
            errorMessage += '>( et aucun autre )</span><br><span';

            if(inputValue.password.length<8) {
                errorMessage += ' style="color:red"';
            }
            errorMessage += '>- Au moins 8 caractères</span>';
        }
        if(errorMessage !== '') {
            //console.log(errorMessage);
            document.getElementsByClassName('error-logger')[0].style.display = 'block';
            document.getElementsByClassName('error-logger')[0].innerHTML = errorMessage;
        }
        if(errorMessage === '') {
            return true;
        }else{
            return false;
        }
    }
    
    return (
        <div className="Signup">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>S'enregistrer</h2>
                <div className="field-box">
                    <div className="signup-form-pseudo signup-form__fields">
                        <div className="signup-form__labels">
                            <label htmlFor="signup-pseudo">Pseudo :</label>
                        </div>
                        <div className="signup-form__inputs">
                            <input type="text" name="signup_pseudo" id="signup-pseudo" onChange={valueChange}/>
                        </div>
                    </div>
                    <div className="signup-form-email signup-form__fields">
                        <div className="signup-form__labels">
                            <label htmlFor="signup-email">E-mail :</label>
                        </div>
                        <div className="signup-form__inputs">
                            <input type="text" name="signup_email" id="signup-email" onChange={valueChange}/>
                        </div>
                    </div>
                    <div className="signup-form-password signup-form__fields">
                        <div className="signup-form__labels">
                            <label htmlFor="signup-password">Mot de passe :</label>
                        </div>
                        <div className="signup-form__inputs">
                            <input type="text" name="signup_password" id="signup-password" onChange={valueChange}/>
                        </div>
                    </div>
                    <div className="signup-form-password signup-form__fields">
                        <div className="signup-form__labels">
                            <label htmlFor="signup-password_confirm">Confirmation du mot de passe :</label>
                        </div>
                        <div className="signup-form__inputs">
                            <input type="text" name="signup_password_confirm" id="signup-password_confirm" onChange={valueChange}/>
                        </div>
                    </div>
                    <button type='submit'>Entrer</button>
                    <div className="error-logger">

                    </div>
                </div>
            </form>
        </div>
    );
}

export default Signup;