import useFetch from '../../hooks/useFetch';
import ReactStarsRating from 'react-awesome-stars-rating';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import Location from '../Location';

const UserPublicData = ({ uid }) => {
    const user = useSelector((s) => s.user);
    const defaultImg = 'https://i.imgur.com/CevZ3gf.jpg';
    const apiURL = 'http://localhost:8080/users/' + uid;
    const dispatch = useDispatch();

    const [results] = useFetch(apiURL);
    const [ratings] = useFetch(`http://localhost:8080/user/${uid}/rating`);

    const bannerUser = `http:\/\/localhost:8080${user?.userData?.banner}`;
    const userImg = results?.image?.indexOf('google')
        ? results?.image
        : `http:\/\/localhost:8080/${results?.image}`;
    console.log(results?.image);

    const handleClick = async (e) => {
        const fd = new FormData();
        fd.append('banner', e.target.files[0]);
        const res = await fetch(`http://localhost:8080/users/update-banner`, {
            method: 'PATCH',
            headers: {
                Authorization: 'Bearer ' + user.token,
            },
            body: fd,
        });
        if (res.ok) {
            const data = await res.json();
            alert('Banner cambiado!');
            dispatch({ type: 'UPDATE', data: { banner: data?.url } });
        } else {
            const data = await res.json();
            alert('Error');
        }
    };

    return (
        <>
            {results && (
                <div className="user-public-data">
                    <div
                        className="public-avatar-background"
                        style={{
                            backgroundImage: `url(${
                                user?.userData?.banner ? bannerUser : defaultImg
                            })`,
                        }}
                    ></div>
                    {+uid === user?.userData?.id && (
                        <label className="update-banner">
                            <input
                                type="file"
                                onChange={(e) => handleClick(e)}
                            />
                        </label>
                    )}

                    <div
                        className="public-avatar"
                        style={{
                            backgroundImage: `url(${
                                results?.image ? userImg : defaultImg
                            })`,
                        }}
                    ></div>
                    <div className="user-public-info">
                        <div className="username-stars">
                            <div className="username">{results?.username}</div>
                            <div className="reviews-info">
                                <div className="review-average">
                                    <ReactStarsRating
                                        className="react-stars"
                                        value={
                                            +results[0]?.review_average > 0
                                                ? +results[0]?.review_average
                                                : 0
                                        }
                                        isEdit={false}
                                        isHalf={true}
                                    />
                                </div>
                                <div className="rating-number">
                                    ({ratings?.total_review ?? '0'})
                                </div>
                            </div>
                        </div>

                        <div className="location">
                            {results?.location ?? (
                                <FormattedMessage id="publicprofile.notlocation" />
                            )}
                        </div>
                        <div className="bio">
                            {results?.bio ?? (
                                <FormattedMessage id="publicprofile.notbio" />
                            )}
                        </div>

                        <Location
                            place={results?.location}
                            className="user-location"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default UserPublicData;
