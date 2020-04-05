import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import DefaultProfileImg from "../images/default-profile-image.jpg";
import { withRouter } from "react-router-dom";
// import MessageMenu from "./MessageMenu"


const Message = ({
  date,
  content,
  messageId,
  sender,
  recipient,
  userId,
  removeMessage,
  isCorrectUser,
  currentUser
}) => {
  let impressionsjsx = null;
  return (
    <li>
      <div className="message">
        <Moment className="messageDate" format="D MMM YYYY">{date}</Moment>
        <div className="messageContent">{content}</div>
      </div>
    </li>
  )
}

export default withRouter(Message);
