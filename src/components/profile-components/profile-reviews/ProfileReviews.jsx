import { useState } from "react"
import MadeReviews from "./MadeReviews"
import ReceivedReviews from "./ReceivedReviews"

function ProfileReviews() {
  const [section, setSection] = useState(false)
  console.log(section)

  // const [madeReviews] = useFetch(`http://localhost:8080/users/${user.userData.id}/review/reviews-made`, user)
  // const [receivedReviews] = useFetch(`http://localhost:8080/users/${user.userData.id}/review/reviews-received`, user)

  return <div className="profile-reviews">
    <h2 className="title">
      <span 
        className="tab" 
        onClick={() => setSection(false)}>
          Valoraciones recibidas
      </span>
      <span className="tab-divider">|</span>
      <span 
        className="tab"
        onClick={() => setSection(true)}>
          Valoraciones hechas
      </span>
    </h2>
      {section === false && <ReceivedReviews/>}
      {section === true && <MadeReviews/>}
  </div>
}

export default ProfileReviews