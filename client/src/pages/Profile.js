import CreateProfile from '../components/CreateProfile/CreateProfile';
import ProfileDetails from '../components/ProfileDetails/ProfileDetails';
import useUserInfo from '../hooks/useUserInfo';

import { auth } from '../services/firebase';
import { useState } from 'react';

const Profile = () => {
    const [user] = useState(auth().currentUser);
    const { userInfo } = useUserInfo(user.uid);

    return (
        <div>
            { !userInfo && <CreateProfile />}
            { userInfo &&
                <div>
                    <ProfileDetails userInfo={userInfo}/>                   
                </div>
            }
        </div>
    );
};

export default Profile;