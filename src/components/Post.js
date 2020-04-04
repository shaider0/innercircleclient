import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import DefaultProfileImg from "../images/default-profile-image.jpg";
import { withRouter } from "react-router-dom";
import PostMenu from "./PostMenu"


const Post = ({
  date,
  content,
  imageUrl,
  postId,
  posts,
  username,
  userId,
  removePost,
  updatePost,
  isCorrectUser,
  currentUser,
  profileImageUrl
}) => {
  let impressionsjsx = null;
  return (
    <li>

      <div className="post">
        <p>{username}</p>
        <p>{content}</p>
        <img
          src={profileImageUrl || DefaultProfileImg}
          alt={username}
          className="timeline-image"
        />
        {imageUrl ?  <img
          src={imageUrl || "#"}
          alt={username}
          className="postImage"
        /> : null
        }
        <PostMenu
        removePost={removePost}
        updatePost={updatePost}
        isCorrectUser={isCorrectUser}
        posts={posts}
        postId={postId}
        userId={userId}
        currentUser={currentUser}
        imageUrl={imageUrl}
        />

        <Moment className="text-muted itemDate" format="D MMM YYYY">
          {date}
        </Moment>

      </div>
    </li>
  )
}

export default withRouter(Post);
