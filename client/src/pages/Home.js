import React, { useState } from 'react';
import { auth } from '../services/firebase';

const Home = () => {
    const [user] = useState(auth().currentUser)
    return (
        <div>
            <h1>Home Page</h1>
            <div>Login in as: <strong>{user.email}</strong></div>
        </div>
    );
};

export default Home;