import PropTypes from 'prop-types';

export default function Header({ title, description, imgUrl }) {
  return (
    <div className="header-container container-fluid p-5 rounded rounded-3">
      <div className="row align-items-center">
        <div className="col-md-6"> 
          <div className="content">
            <h1>{title || 'Default Title'}</h1> 
            <p>{description || 'Default description goes here.'}</p> 
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <div className="img">
            <img 
              src={imgUrl || '/default-image.jpg'} 
              alt={title ? `Image for ${title}` : 'Default header image'}
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Adding PropTypes for validation
Header.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  imgUrl: PropTypes.string,
};

// Providing default props
Header.defaultProps = {
  title: 'Default Title',
  description: 'Default description goes here.',
  imgUrl: '/default-image.jpg',  // Fallback image
};
