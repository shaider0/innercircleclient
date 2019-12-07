import React from "react"
import Moment from "react-moment"
import { Link } from "react-router-dom"
import DefaultProfileImg from "../images/default-profile-image.jpg"
import { withRouter } from "react-router-dom"

const MessageItem = ({ date, sender, recipient, message }) => {
  return (
    <div>
      <Moment className="text-muted" format="Do MMM YYYY">
        {date}
      </Moment>
      <p>From: {sender}</p>
      <p>Message: {message}</p>
    </div>
  )
}

export default withRouter(MessageItem)
