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

        console.log(newUser);
        console.log(formData);
        console.log(formData.has('avatar'));
        console.log(formData.get('avatar'));
        const options = {
            headers: { 'Content-Type': 'multipart/form-data; charset=UTF-8, boundary=--|--|--' }
        };

        fetchCors('/api/user/profile/avatar', "POST", formData, options)
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