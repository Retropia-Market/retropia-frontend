import { useParams } from 'react-router';
import UserPublicData from './UserPublicData';
import UserPublicInventory from './UserPublicInventory';

const UserPublicProfile = () => {
    const { uid } = useParams();
    return (
        <div className="outside-box">
            <div className="user-public-profile">
                <UserPublicData uid={uid} />
                <UserPublicInventory uid={uid} />
            </div>
        </div>
    );
};

export default UserPublicProfile;
