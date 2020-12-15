import './ProfileDetails.scss';
import ArtistProfile from '../ArtistProfile/ArtistProfile';
import { ReactComponent as Like } from '../../assets/icons/like2.svg';
import { ReactComponent as Follow } from '../../assets/icons/watch.svg';
import ImageModal from '../ImageModal/ImageModal';
import ImageGrid from '../ImageGrid/ImageGrid';
import { useState } from 'react';

const ProfileDetails = ({ userInfo, url }) => {
    const [selectedImg, setSelectedImg] = useState(null);
    const query = {
        field: 'likes',
        operator: 'array-contains',
        query: { user: userInfo.username }
    };


    return !userInfo ? <p>loading...</p> : (
        <>
            <div className="profile">
                <div className="profile__details">
                    <div className="profile__aside"> 
                        <div className="profile__avatar">
                            <img className="profile__avatar-img" src={userInfo.profileImg} alt="avatar"/>
                        </div>
                        <div className="profile__stats">
                            <div className="profile__stats-container">
                                <Like className="profile__icon" />
                                <h4 className="profile__stats-text">Likes: {!userInfo.likes
                                    ? 0
                                    : userInfo.likes.length}</h4>
                            </div>
                            <div className="profile__stats-container">
                                <Follow className="profile__icon" />
                                <h4 className="profile__stats-text">Followers: 0</h4>
                            </div>
                        </div>
                    </div>
                    <div className="profile__user-info">
                        <h3 className="profile__label">{userInfo.username}</h3>
                        <h3 className="profile__label">Bio:</h3>
                        <h4 className="profile__bio">{userInfo.bio}</h4>
                        { userInfo.isArtist &&
                            <h3 className="profile__label">Booking Status:<br/>{userInfo.bookings}</h3>
                        }
                    </div>
                </div>
                { (userInfo.isArtist === true && !url) &&
                     <ArtistProfile userInfo={userInfo} />
                }
                { userInfo.isArtist &&
                    <ImageGrid
                        searchParams={query}
                        setSelectedImg={setSelectedImg}
                    />
                }
                {selectedImg &&
                    <ImageModal
                        selectedImg={selectedImg}
                        setSelectedImg={setSelectedImg}
                    />
                }
            </div>
        </>
    );
}
 
export default ProfileDetails;