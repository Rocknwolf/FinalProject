import React, {useState, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import './RegistrationForm.css';

import fetchCors from '../../lib/fetchCors.js';
import logIOToggler from '../../lib/logIOToggler.js'
import { globalContext } from '../../App.js';

function RegistrationForm() {
        
    const context = useContext(globalContext);

    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const [birthday, setBirthday] = useState(0);
    const [passwordErr, setPasswordErr] = useState("");
    const [credentialError, setCredentialError] = useState("");
    const [isValid, setIsValid] = useState([]);

    const [isSend, setIsSend] = useState(false);

    const history = useHistory();

    const handleRegistration = async (e) => {
        e.preventDefault();

        setPasswordErr("");
        const _isValid = formValidation();
        setIsValid(_isValid);
        if (!_isValid) {
            return;
        }

        if(!isSend && _isValid) {
            setIsSend(true);

            const res = await fetchCors( "/api/user", "POST", 
                JSON.stringify({
                    username: username,
                    firstName: firstname,
                    lastName: lastname,
                    email: email,
                    password: password,
                    birthDate: birthday,
                    // passwordVerify
                })   
            );
            
            const is = await res.json();

            if(is.value)
            if(is.value.auth) {
                const isLogin = logIOToggler();
                context.updateContext(context, {
                    isLogin: isLogin,
                    username: isLogin ? username : ''
                });
            
                history.push('/');
            }

            if(is.error)
            if(is.error.message) {
                console.log(is.error.message);
                setCredentialError(is.error.message);
            }

            setTimeout(() => {
                setIsSend(false);
            }, 1000);
        }

    };

    const formValidation = () => {
        let isValid;
        isValid = true;

        const isMatch = password.match(/^((?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[ °^!§$%&/()=?<>|'"`´µ€@²³#+*~_-]).+)$/); // returns [...matches] or null
        if(!isMatch) {
            setPasswordErr("pw not strong enough");
            isValid = false;
        }
        
        if (password.trim().length < 8) {
            setPasswordErr("Password too short");
            isValid = false;
        }
        
        if (password !== passwordVerify) {
            setPasswordErr("Passwords dont match");
            isValid = false;
        }

        return isValid;
    }
    
    return (
        <div>
            <div className="frame">
                <h1>Registration</h1>
                
                    <form action="" onSubmit={handleRegistration}>
                        <div className="regContainer">
                            <label htmlFor="Username" className="regLabel">Username:</label>
                            <input type="text" name="Username" id="Username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                            {
                                credentialError.username ?
                                <div className="error">
                                    { credentialError.username } already exists
                                </div>
                                : null
                            }
                            <label htmlFor="Firstname" className="regLabel">Firstname:</label>
                            <input type="text" name="Firstname" id="Firstname" placeholder="Firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
                            <label htmlFor="Lastname" className="regLabel">Lastname:</label>
                            <input type="text" name="Lastname" id="Lastname" placeholder="Lastname" value={lastname} onChange={(e) => setLastname(e.target.value)}/>
                            <label htmlFor="Email" className="regLabel">Email:</label>
                            <input type="email" name="Email" id="Email" placeholder="E-Mail" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            {
                                credentialError.email ?
                                <div className="error">
                                    { credentialError.email } already exists
                                </div>
                                : null
                            }
                            <label htmlFor="Password" className="regLabel">Password:</label>
                            <input type="password" name="Password" id="Password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                            <label htmlFor="passwordRepeat" className="regLabel">Password repeat:</label>
                            <input type="password" name="passwordRepeat" id="passwordRepeat" placeholder="repeat Password" value={passwordVerify} onChange={(e) => setPasswordVerify(e.target.value)} required/>
                            {
                                !isValid ?
                                <div className="error">
                                    { passwordErr }
                                </div>
                                : null
                            }
                        </div>
                        <div className="birthday">
                            <label htmlFor="age" className="regLabel">Birthdate</label>
                            <input type="date" name="age" id="age" placeholder="yyyy-mm-dd" value={birthday} maxLength="10" onChange={(e) => setBirthday(e.target.value)} required/>
                        </div>
                        <button type="submit" className="button">Registrieren</button>
                    </form>
            </div>
        </div>
    )
}

export default RegistrationForm
