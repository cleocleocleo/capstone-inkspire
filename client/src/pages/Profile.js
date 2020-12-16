import CreateProfile from '../components/CreateProfile/CreateProfile';
import ProfileDetails from '../components/ProfileDetails/ProfileDetails';
import useUserInfo from '../hooks/useUserInfo';

const Profile = () => {
    const { userInfo } = useUserInfo();

    return !userInfo ? <p>loading...</p> : (
        <div>
            { !userInfo.username  && <CreateProfile />}
            { userInfo.username &&
                <div>
                    <ProfileDetails userInfo={userInfo}/>                   
                </div>
            }
        </div>
    );
};

export default Profile;