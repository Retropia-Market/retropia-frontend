const Location = (place) => {
    return (
        <div className="location">
            <iframe title='product-map'
            width="300"
            height="225"
            style={{border: 0}}
            loading="lazy"
            allowfullscreen
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyD68L1yufnrY_Q7lLlfav43P-33LauEgso
    &q=${place}`}
        >
        </iframe>
        </div>
    )
}

export default Location