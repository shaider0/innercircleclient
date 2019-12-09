import React from "react"
import Moment from "react-moment"
import { Link } from "react-router-dom"
import DefaultProfileImg from "../images/default-profile-image.jpg"
import { withRouter } from "react-router-dom"

const PersonalRecommendationItem = ({ date, sender, recipient, item }) => {
  return (
    <div>
      <Moment className="text-muted" format="Do MMM YYYY">
        {date}
      </Moment>
      <p>{sender} thinks you'll like {item}</p>
      <button>Add To My Watch List</button>
      <button>Ignore</button>
    </div>
  )
}

export default withRouter(PersonalRecommendationItem)
