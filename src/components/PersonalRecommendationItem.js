import React from "react"
import Moment from "react-moment"
import { Link } from "react-router-dom"
import DefaultProfileImg from "../images/default-profile-image.jpg"
import { withRouter } from "react-router-dom"

const PersonalRecommendationItem = ({ date, sender, item, category }) => {
  return (
    <div>
      <span><Moment className="text-muted" format="Do MMM YYYY">
        {date}
      </Moment></span>
      <span> @<Link to='#'>{sender}</Link> thinks you'll like the {category} {item}</span>
      <p>
        <button>Add To My Watch List</button>
        <button>Ignore</button>
      </p>
    </div>
  )
}

export default withRouter(PersonalRecommendationItem)
