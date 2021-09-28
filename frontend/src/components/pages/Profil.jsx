import React from 'react'

import ProfilePicture from '../../images/ProfileImages/brain.jpg';
import './Profile.css';

import Navbar from '../Navbar.jsx';

function Profil(props) {

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
            <div className="userObject">
                <p className="userInformationen">userObject</p> {/*backend*/}
                <ul className="userData">
                    <li>Username:{props.usernameP} </li>
                    <li>E-Mail: {props.emailP} </li>
                    <li>Firstname: {props.firstNameP} </li>
                    <li>Lastname: {props.firstNameP} </li>
                    <li>Birthdate: {props.lastNameP} </li>
                    <li>Gender:  </li> {/*Hinten angestellt*/}
                    <li>Timezone:  </li> {/*Hinten angestellt*/}
                </ul>
            </div>

        </div>
    )
}

export default Profil
