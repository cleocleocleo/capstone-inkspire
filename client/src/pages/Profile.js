import React, { Component } from 'react';
import { auth } from '../services/firebase';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user: auth().currentUser,
        }
    }
    render() {
        console.log(this.state.user)
        return (
            <div>
                <div>Login in as: <strong>{this.state.user.email}</strong></div>
            </div>
        );
    }
}

export default Profile;