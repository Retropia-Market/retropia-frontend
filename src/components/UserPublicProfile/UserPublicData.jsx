import useFetch from '../../hooks/useFetch';
import ReactStarsRating from 'react-awesome-stars-rating';



const UserPublicData = ({uid}) => {
    const defaultImg = 'https://i.imgur.com/CevZ3gf.jpg'
    const apiURL = 'http://localhost:8080/users/'+ uid;

    const [results] = useFetch(apiURL)
    const [ratings] = useFetch(`http://localhost:8080/user/${uid}/rating`)

    return (<>
       {results &&  <div className="user-public-data">
            <div className="public-avatar" style={{backgroundImage : `url(${results.img ?? defaultImg})`}}></div>
            <div className="user-public-info">
                <div className="username">{results?.username}</div>
                <div className="reviews-info">
                    <div className="review-average">
                    {results[0]?.review_average && <ReactStarsRating
                  value={+(results[0]?.review_average)}
                  isEdit={false}
                  isHalf={true}
                />}</div>
                    <div className="rating-number">({ratings?.total_review ?? '0'})</div>
                </div>
                <div className="location">{results?.location ?? 'Localización no específicada' }</div>
                <div className="bio">{results?.bio ?? 'Aun no tiene ninguna bio'}</div>
            </div>
        </div>}</>
    )
}

export default UserPublicData