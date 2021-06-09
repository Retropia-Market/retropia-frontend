const Location = ({ place }) => {
  return (
    <div className="location">
      <h2>{place}</h2>
      <iframe
      className='product-location'
        title="product-map"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_API_KEY}
    &q=${place}`}
      ></iframe>
    </div>
  );
};

export default Location;
