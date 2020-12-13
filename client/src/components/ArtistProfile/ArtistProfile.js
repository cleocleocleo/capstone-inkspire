import './ArtistProfile.scss';
import CreateGallery from '../CreateGallery/CreateGallery';
import GalleryGrid from '../GalleryGrid/GalleryGrid';
import useGalleries from '../../hooks/useGalleries';

const ArtistProfile = ({ userInfo }) => {
    const { galleries } = useGalleries(userInfo.id);

    return (
        <section>
            <CreateGallery />
            <GalleryGrid galleries={galleries} />
        </section>
    );
}
 
export default ArtistProfile;