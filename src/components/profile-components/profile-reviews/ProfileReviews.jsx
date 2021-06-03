import { useState } from "react"
import ReviewCard from "./ReviewCard"

function ProfileReviews() {

  const [section, setSection] = useState(1)

  return <div className="profile-reviews">
    <h2 className="title">
      <span 
        className="tab" 
        onClick={() => setSection(1)}>
          Valoraciones recibidas
      </span>
      <span className="tab-divider">|</span>
      <span 
        className="tab"
        onClick={() => setSection(2)}>
          Valoraciones hechas
      </span>
    </h2>
      <ReviewCard section={section}/>
  </div>
}

export default ProfileReviews