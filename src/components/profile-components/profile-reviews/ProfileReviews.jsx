import { useState } from "react"

function ProfileReviews() {

  const [section, setSection] = useState(1)

  return <div className="profile-reviews">
    <h2 className="title">
      <span>Valoraciones recibidas</span>
      <span>Valoraciones hechas</span>
    </h2>
  </div>
}

export default ProfileReviews