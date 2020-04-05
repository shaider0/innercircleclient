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
    <li className="message-list-item">
      <div className="message">
        <p className="messageDate">
          <strong>Date: </strong><Moment format="D MMM YYYY">{date}</Moment>
        </p>
        <p><strong>From:</strong> {sender.username}</p>
        <p className="messageContent"><strong>Message:</strong> {content}</p>
      </div>
    </li>
  )
}

export default withRouter(Message);
