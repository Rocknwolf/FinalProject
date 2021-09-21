import React, {useState} from 'react'
import './RegistrationForm.css';
import Navbar from '../Navbar.jsx';

function RegistrationForm() {

        const [username, setUsername] = useState("");
        const [firstname, setFirstname] = useState("");
        const [lastname, setLastname] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [passwordVerify, setPasswordVerify] = useState("");
        const [birthday, setBirthday] = useState(0)

        const handleRegistration = (e) => {
          e.preventDefault();
          fetch("http://localhost:4200/api/user/", {
            method: "POST",
            body: JSON.stringify({
                username,
                firstname,
                lastname,
                email,
                password,
                passwordVerify
            }),
            headers: {
              "Content-type": "application/json",
            },
          });
        };

    return (
        <div>
            <div className="frame">
                <h1>Registration</h1>
                <div className="navigation">
                    <Navbar/>
                </div>
                    <form action="" onSubmit={handleRegistration}>
                        <div className="regContainer">
                            <label for="Username" className="regLabel">Username:</label>
                            <input type="text" name="Username" id="Username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}required/>
                            <label for="Firstname" className="regLabel">Firstname:</label>
                            <input type="text" name="Firstname" id="Firstname" placeholder="Firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
                            <label for="Lastname" className="regLabel">Lastname:</label>
                            <input type="text" name="Lastname" id="Lastname" placeholder="Lastname" value={lastname} onChange={(e) => setLastname(e.target.value)}/>
                            <label for="Email" className="regLabel">Email:</label>
                            <input type="email" name="Email" id="Email" placeholder="E-Mail" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            <label for="Password" className="regLabel">Password:</label>
                            <input type="password" name="Password" id="Password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                            <label for="passwordRepeat" className="regLabel">Password repeat:</label>
                            <input type="password" name="passwordRepeat" id="passwordRepeat" placeholder="repeat Password" value={passwordVerify} onChange={(e) => setPasswordVerify(e.target.value)} required/>
                        </div>
                        <div className="birthday">
                            <label for="age" className="regLabel">Birthdate</label>
                            <input type="date" name="age" id="age" placeholder="age" value={birthday} onChange={(e) => setBirthday(e.target.value)} required/>
                        </div>
                            <button type="submit" className="button">Registrieren</button>
                    </form>
            </div>
        </div>
    )
}

export default RegistrationForm
