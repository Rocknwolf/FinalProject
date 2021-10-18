import React, {useState, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import './RegistrationForm.css';

import fetchCors from '../../lib/fetchCors.js';
import logIOToggler from '../../lib/logIOToggler.js'
import { globalContext } from '../../App.js';

function EditProfile() {
    const context = useContext(globalContext);

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [isValid, setIsValid] = useState([]);

    const [isSend, setIsSend] = useState(false);

    const history = useHistory();

    const handleChange = async (e) => {
        e.preventDefault();

        setIsValid(formValidation());
        if (!isValid) {
            return;
        }

        setIsSend(true);

        if(!isSend) {
            const res = await fetchCors( "/api/user/profile", "PATCH", 
                JSON.stringify({
                    updates: {
                        username: username,
                        email: email, // new value
                        password: password,
                        firstName: firstname,
                        lastName: lastname
                    },
                    email: email //searched user
                })   
            );
            
            const is = await res.json();
            if(is)
            if(is.value)
            if(is.value.auth) {
                const isLogin = logIOToggler();
                context.updateContext(context, {
                    isLogin: isLogin,
                    username: isLogin ? username : ''
                });
            
            }
            setTimeout(() => {
                setIsSend(false);
            }, 1000);
    
            history.push('/');
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
            <h1>Profil ändern</h1>
                    <form action="" onSubmit={handleChange}>
                        <div className="regContainer">

                            <label htmlFor="Username" className="regLabel">Username:</label>
                            <input type="text" name="Username" id="Username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                            
                            <label htmlFor="Email" className="regLabel">Email:</label>
                            <input type="email" name="Email" id="Email" placeholder="E-Mail" value={email} onChange={(e) => setEmail(e.target.value)} required/>

                            <label htmlFor="Password" className="regLabel">Password:</label>
                            <input type="password" name="Password" id="Password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>

                            <label htmlFor="Firstname" className="profLabel">Firstname:</label>                            
                            <input type="text" name="Firstname" id="Firstname" placeholder="Firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
                            
                            <label htmlFor="Lastname" className="profLabel">Lastname:</label>
                            <input type="text" name="Lastname" id="Lastname" placeholder="Lastname" value={lastname} onChange={(e) => setLastname(e.target.value)}/>

                        </div>
                            <div>
                                {!isValid ? passwordErr : ""}
                            </div>
                            <button type="submit" className="button">update Profile</button>
                    </form>
        </div>
    )
}

export default EditProfile
