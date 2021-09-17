import React from 'react'
import './RegistrationForm.css';
import Navbar from '../Navbar.jsx';

function RegistrationForm() {
    return (
        <div>
            <div className="frame">
                <h1>Registration</h1>
                <div className="navigation">
                    <Navbar/>
                </div>
                    <form action="" > {/* onSubmit={handleSubmit} */}
                        <div className="regContainer">
                            <label className="regLabel">Username:</label>
                            <input type="text" name="" id="" placeholder="Username" required/>
                            <label className="regLabel">Firstname:</label>
                            <input type="text" name="" id="" placeholder="Firstname"/>
                            <label className="regLabel">Lastname:</label>
                            <input type="text" name="" id="" placeholder="Lastname"/>
                            <label className="regLabel">Email:</label>
                            <input type="email" name="" id="" placeholder="E-Mail" required/>
                            <label className="regLabel">Password:</label>
                            <input type="password" name="" id="" placeholder="Password" required/>
                            <label className="regLabel">Password repeat:</label>
                            <input type="password" name="" id="" placeholder="repeat Password" required/>
                        </div>
                        <div className="birthday">
                            <label className="regLabel">Birthdate</label>
                            <input type="date" name="" id="" placeholder="age" required/>
                        </div>
                            <button type="submit" className="button">Registrieren</button>
                    </form>
            </div>
        </div>
    )
}

export default RegistrationForm
