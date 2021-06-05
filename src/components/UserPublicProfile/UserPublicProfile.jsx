import { useParams } from "react-router";
import UserPublicData from "./UserPublicData"
import UserPublicInventory from "./UserPublicInventory"

const UserPublicProfile = () => {

    const { uid } = useParams();
    return (
        <div className="user-public-profile">
            <UserPublicData uid={uid}/>
            <UserPublicInventory uid={uid}/>
        </div>
    )
}

export default UserPublicProfile