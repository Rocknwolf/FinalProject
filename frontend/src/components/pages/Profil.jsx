import React, {useEffect, useState} from 'react'

import fetchCors from '../../lib/fetchCors';

// import logIOToggler from '../../lib/logIOToggler.js'
// import globalContext from '../../App.js';

import ProfilePicture from '../../images/ProfileImages/brain.jpg';
import './Profile.css';

import Navbar from '../Navbar.jsx';
import Upload from '../Upload.jsx';

function Profil(props) {
    // e.preventDefault();
    // const context = useContext(globalContext); 
    const [profileData, setProfileData] = useState({ hits: [] });

    useEffect(() => {
        const handleUserProfileApi = async () => {
            const res = await fetchCors(
            `/api/profile/:username`, "GET",
            );
            const data = await res.json();
            setProfileData(data);
            console.log("dataaaa:", profileData);
            // return data;
        }; 
            handleUserProfileApi();
            // if(res) context.updateContext('isLogin' ,logIOToggler());
    }, [profileData]);
    
    return (
        <div className="mainProfilBox">
            <br />
            <br />
            <h3>Profil-Informationen</h3>
            {/* <button type="submit" onClick={(e)=>handleUserProfileApi}>API</button> */}
            <br />
            <br />
            <div className="pictureBack">
                <img className="userPic" src={ProfilePicture} alt="Profilbild" width="150px" height="150px"/>
                <Upload/>
            </div>
            <br />
            <br />
                {/* <p><a href="/messages">Postfach</a></p>
                <p><a href="/sendedMessages">gesendete Nachrichten</a></p> */}
                <Navbar/>
            <div className="userObject">
                <h2 className="userInformationen">{profileData.username}</h2>
                <ul className="userData">
                    <li>Username: {profileData.username} </li>
                    <li>E-Mail: {profileData.email} </li>
                    <li>Firstname: {profileData.firstname} </li>
                    <li>Lastname: {profileData.lastname} </li>
                    <li>Birthdate: {profileData.birthdate} </li>
                    {/* <li>Gender:  </li> Hinten angestellt*/}
                    {/* <li>Timezone:  </li> Hinten angestellt */}
                </ul>
            </div>

        </div>
    )
}

export default Profil
