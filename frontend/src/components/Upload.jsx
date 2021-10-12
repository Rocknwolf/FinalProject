import React, { useContext, useEffect, useState } from 'react';
import fetchCors from '../lib/fetchCors';

import { globalContext } from '../App.js';

const Upload = () => {
    const context = useContext(globalContext);
    const [isBlocking, setIsBlocking] = useState(false);
    const [avatar, setAvatar] = useState(
        {
            avatarUri: '',
        }
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!isBlocking)
        {
            setIsBlocking(true);
    
            const formData = new FormData();
            formData.append('avatar', avatar.avatarUri);
            formData.append('email', context.profileData.email);
    
            const options = {
                /** empty header to auto fill Content-Type multipart/form-data header
                 * with matching random generated boundary value **/
                headers: {}
            };
    
            const res = await fetchCors('/api/user/profile/avatar/', 'PATCH', formData, options);
    
            if(res) {
                const resObj = await res.json();
                if(resObj.src){
                    const profileData = { ...context.profileData }
                    profileData.avatarURI = resObj.src;
                    context.updateContext(context, { profileData: profileData });
                }
            }
            setIsBlocking(false);
        }
    }

    const handlePhoto = (e) => {
        setAvatar({...avatar, avatarUri: e.target.files[0]});
    }

    return (
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <input 
                type="file" 
                accept=".png, .jpg, .jpeg"
                name="avatar"
                onChange={handlePhoto}
            />
            <input 
                type="submit"
            />
        </form>
    );
}

export default Upload;