import React, { useState } from 'react';
import { auth } from '../services/firebase';
import { logout } from '../helpers/auth';

const Home = () => {
    const [user] = useState(auth().currentUser)

    const handleLogout = () => {
        logout();
    }
    
    return (
        <div>
            <h1>Home Page</h1>
            <div>Login in as: <strong>{user.email}</strong></div>
            <h5 onClick={handleLogout}>Log Out</h5>
        </div>
    );
};

export default Home;