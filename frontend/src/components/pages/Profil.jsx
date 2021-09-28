import React from 'react'

import User from '../../../../backend/models/User.js';

import ProfilePicture from '../../images/ProfileImages/brain.jpg';
import './Profile.css';

import Navbar from '../Navbar.jsx';
import Logout from '../Logout.jsx';

function Profil() {

    return (
        <div className="mainProfilBox">
            <br />
            <br />
            <h3>Profil-Informationen</h3>
            <br />
            <br />
            <div className="pictureBack">
                <img className="userPic" src={ProfilePicture} alt="Profilbild" width="150px" height="150px"/>
            </div>
            <br />
            <br />
                <p><a href="/messages">Postfach</a></p> {/*Route anlegen*/}
                <p><a href="/sendedMessages">gesendete Nachrichten</a></p> {/*Route anlegen*/}
                <Navbar/>
                <Logout className="logoutProfil" />
            <div className="userObject">
                <p className="userInformationen">userObject</p> {/*backend*/}
                <ul className="userData">
                    <li>Username:{User.usernameP} </li>
                    <li>E-Mail: {User.emailP} </li>
                    <li>Firstname: {User.firstNameP} </li>
                    <li>Lastname: {User.firstNameP} </li>
                    <li>Birthdate: {User.lastNameP} </li>
                    <li>Gender:  </li> {/*Hinten angestellt*/}
                    <li>Timezone:  </li> {/*Hinten angestellt*/}
                </ul>
            </div>

        </div>
    )
}

export default Profil
