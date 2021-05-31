const Location = (place) => {

    const {API_KEY} = process.env
    console.log(API_KEY)
    return (
        <div className="location">
            <iframe title='product-map'
            width="300"
            height="225"
            style={{border: 0}}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_API_KEY}
    &q=${place}`}
        >
        </iframe>
        </div>
    )
}

export default Location