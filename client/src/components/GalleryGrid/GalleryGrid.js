import './GalleryGrid.scss';
import addImage from '../../assets/icons/add-image2.svg';
import { Link } from 'react-router-dom';

const GalleryGrid = ({ galleries }) => {

    return (
        <div className="gallery-grid">
            {galleries.map(gallery => (
                <div className="gallery-grid__container">
                    <div className="gallery-grid__item" key={gallery.id}>
                        <Link to={`/profile/${gallery.id}`}>
                            <img className="gallery-grid__img" src={gallery.images ? gallery.images[0].url : addImage} alt="album cover" />
                        </Link>
                    </div>
                    <h2 className="gallery-grid__title">{gallery.title}</h2>
                </div>
            ))}
        </div>
    );
}

export default GalleryGrid;