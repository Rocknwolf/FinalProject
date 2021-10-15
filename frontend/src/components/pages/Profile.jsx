import React, {useContext, useEffect, useState} from 'react'

import fetchCors from '../../lib/fetchCors';
import { globalContext } from '../../App';

import ProfilePicture from '../../images/ProfileImages/brain.jpg';
import './Profile.css';

import Upload from '../Upload.jsx';

import {Link} from 'react-router-dom'

function Profile (props) {
    // e.preventDefault();
    const context = useContext(globalContext);
    const [profileData, setProfileData] = useState({});

    useEffect(() => {
        const handleUserProfileApi = async () => {
            let data;
            const res = await fetchCors(
                `/api/user/profile/${context.username}`,
                "GET"
            );
            if(res) {
                data = await res.json();
                data.birthDate = new Date(data.birthDate).toLocaleDateString(context.lang);
            }
            setProfileData(data);
            context.updateContext(context, { profileData: data });
        };
        if(!context.profileData) handleUserProfileApi();
    }, []);

    const getAvatar = () => {
        if(context.profileData) {
            if(context.profileData.avatarURI) return context.profileData.avatarURI;
        }
        if(profileData.avatarURI) return profileData.avatarURI;
        return ProfilePicture;
    }
    
    return (
        <div className="mainProfilBox">
            <br />
            <br />
            <h3>Profil-Informationen</h3>
            {/* <button type="submit" onClick={(e)=>handleUserProfileApi}>API</button> */}
            <br />
            <br />
            <div className="pictureBack">
                <img className="userPic" src={getAvatar()} alt="Profilbild" width="150px" height="150px"/>
                <Upload />
            </div>
            <br />
            <br />
            {/* <p><a href="/messages">Postfach</a></p>
            <p><a href="/sendedMessages">gesendete Nachrichten</a></p> */}
            {
                context.isLogin ?
                    context.profileData ?
                        <div className="userObject">
                                <h2 className="userInformationen">{context.username}</h2>
                                <ul className="userData">
                                    <li>Username: {context.profileData.username} </li>
                                    <li>E-Mail: {context.profileData.email} </li>
                                    <li>First name: {context.profileData.firstName} </li>
                                    <li>Last name: {context.profileData.lastName} </li>
                                    <li>Birth date: {context.profileData.birthDate}
                                    </li>
                                    {/* <li>Gender:  </li> Hinten angestellt*/}
                                    {/* <li>Timezone:  </li> Hinten angestellt */}
                                </ul>
                        </div>
                        :
                        <div className="userObject">
                                <h2 className="userInformationen">{profileData.username}</h2>
                                <ul className="userData">
                                    <li>Username: {profileData.username} </li>
                                    <li>E-Mail: {profileData.email} </li>
                                    <li>First name: {profileData.firstName} </li>
                                    <li>Last name: {profileData.lastName} </li>
                                    <li>Birth date: {profileData.birthDate}
                                    </li>
                                    {/* <li>Gender:  </li> Hinten angestellt*/}
                                    {/* <li>Timezone:  </li> Hinten angestellt */}
                                </ul>
                        </div>
                    : null
            }
            <Link to="/edit-profile" ><button>Edit Profile</button></Link>
        </div>
    )
}

export default Profile
