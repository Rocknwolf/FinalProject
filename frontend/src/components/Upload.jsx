import React, { useState } from 'react';
import fetchCors from '../lib/fetchCors';

const Upload = () => {
    const [newUser, setNewUser] = useState(
        {
            avatarUri: '',
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('avatar', newUser.avatarUri);

        const options = {
            /** empty header to auto fill Content-Type multipart/form-data header
             * with matching random generated boundary value **/
            headers: {}
        };

        fetchCors('/api/user/profile/avatar/', "POST", formData, options)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const handlePhoto = (e) => {
        setNewUser({...newUser, avatarUri: e.target.files[0]});
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