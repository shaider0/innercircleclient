import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPosts, removePost, updatePost } from "../store/actions/posts";
import Post from './Post'
import { Link } from "react-router-dom"

class Feed extends Component{
  constructor(props) {
    super(props);

    this.state = {
      filterMenu: false,
      singleUserContent: "",
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.toggleFilterMenu = this.toggleFilterMenu.bind(this)
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  toggleFilterMenu() {
    this.setState((prevState) => ({
      filterMenu: !prevState.filterMenu
    }))
  }

  componentDidMount() {
    const { currentUser } = this.props
    this.props.fetchPosts(currentUser);
  }

  render() {
    const { posts, removePost, updatePost, currentUser } = this.props;
    let items = [ ...posts]
    let sortedItems = items.sort((a, b) => (a.updatedAt > b.updatedAt) ? -1 : 1)
    let feedList = sortedItems.map(m => {
      return (
        <Post
        className="post"
        key={m._id}
        date={m.updatedAt}
        content={m.content}
        imageUrl={m.imageUrl}
        postId={m._id}
        username={m.user.username}
        userId={m.user._id}
        profileImageUrl={m.user.profileImageUrl}
        removePost={removePost.bind(this, m.user._id, m._id)}
        updatePost={updatePost.bind(this, m.user._id, m._id)}
        currentUser={currentUser}
        isCorrectUser={currentUser === m.user._id || currentUser === m.user}
      />)
    })
    const filterMenu = (
      <div className="filterMenu">
          <div className="friendFilter">
            <h5>Username: </h5>
            <input
              type="text"
              onChange={this.handleInputChange}
              name="singleUserContent"
              value={this.state.singleUserContent}
            />
          </div>
      </div>
    )

    return (
      <div className="feed">
        <br/>
        <div className="feedButtons">

          <Link to={`/users/${currentUser}/create-item`} className="btn btn-success"><i className="fas fa-plus"></i>New Post</Link>

          <button className="btn btn-success" onClick={this.toggleFilterMenu}><i className="fas fa-search">
            </i> Filters &#9660;
          </button>

        </div>
        {this.state.filterMenu ? filterMenu : null}
        <div>
          <ul>
            {feedList}
          </ul>
        </div>
      </div>
    )

    // end render method
  }

// end class
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    currentUser: state.currentUser.user.id
  };
}

export default connect(mapStateToProps, {
  fetchPosts,
  removePost,
  updatePost
})(
  Feed
);
