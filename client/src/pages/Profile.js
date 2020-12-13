import CreateProfile from '../components/CreateProfile/CreateProfile';
import ProfileDetails from '../components/ProfileDetails/ProfileDetails';
import useUserInfo from '../hooks/useUserInfo';

const Profile = () => {
    const { userInfo } = useUserInfo();

    return (
        <div>
            { !userInfo && <CreateProfile />}
            { userInfo &&
                <div>
                    <ProfileDetails />
                </div>
            }
        </div>
    );
};

export default Profile;