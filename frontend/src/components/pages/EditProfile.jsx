import React, {useState} from 'react'

function EditProfile() {
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
            const res = await fetchCors( "/api/user", "PATCH", 
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
                            <label htmlFor="Firstname" className="profLabel">Firstname:</label>                            
                            <input type="text" name="Firstname" id="Firstname" placeholder="Firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
                            
                            <label htmlFor="Lastname" className="profLabel">Lastname:</label>
                            <input type="text" name="Lastname" id="Lastname" placeholder="Lastname" value={lastname} onChange={(e) => setLastname(e.target.value)}/>
                            
                            <input type="password" name="Password" id="Password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                            <label htmlFor="passwordRepeat" className="profLabel">Password repeat:</label>
                            <input type="password" name="passwordRepeat" id="passwordRepeat" placeholder="repeat Password" value={passwordVerify} onChange={(e) => setPasswordVerify(e.target.value)} required/>
                        </div>
                            <div>
                                {!isValid ? passwordErr : ""}
                            </div>
                            <button type="submit" className="button">Registrieren</button>
                    </form>
        </div>
    )
}

export default EditProfile
