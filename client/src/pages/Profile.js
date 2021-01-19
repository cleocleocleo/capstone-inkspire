import CreateProfile from '../components/CreateProfile/CreateProfile';
import ProfileDetails from '../components/ProfileDetails/ProfileDetails';
import useUserInfo from '../hooks/useUserInfo';
import Nav from '../components/Nav/Nav';

const Profile = () => {
    const { userInfo } = useUserInfo();

    return !userInfo ? <p>loading...</p> : (
        <>
        <Nav />
            <div>
                { userInfo.username &&
                    <div>
                        <ProfileDetails userInfo={userInfo}/>                   
                    </div>
                }
                { !userInfo.username  && <CreateProfile />}
            </div>
        </>
    );
};

export default Profile;