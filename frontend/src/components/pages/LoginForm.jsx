import React, { useState } from 'react';
import './LoginForm.css';

function LoginForm() {
    const [submitting, setSubmitting] = useState(false);

        const handleSubmit = event => {
            event.preventDefault();
            setSubmitting(true);

            if(submitting === true){
                alert('You have submitted the form.')
            };
            
       }
    return (
        <div>
            <div className="logframe">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="loginContainer">
                        <label className="logLabel">Name:</label>
                        <input type="text" name="" id="" placeholder="insert your name" required/>
                        <label className="logLabel">Password:</label>
                        <input type="password" name="" id="" placeholder="insert your password" required/>
                    </div>
                        <button type="submit" value="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default LoginForm
