import React, { Component } from "react"
import { Link } from "react-router-dom"

class PostMenu extends Component {
  constructor(props){
    super(props)
    this.state = {
      showMenu: false
    }
    this.toggleMenu = this.toggleMenu.bind(this)
    this.hideMenu = this.hideMenu.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  toggleMenu() {
    this.setState((prevState) => ({
      showMenu: !prevState.showMenu
    }))
  }

  hideMenu(){
    this.setState({
      showMenu: false
    })
  }

  componentWillMount(){
    document.addEventListener('mousedown', this.handleClick, false)
  }

  componentWillUnmount(){
    document.removeEventListener('mousedown', this.handleClick, false)
  }

  handleClick = (e) => {
    if (this.node.contains(e.target)) {
      return
    }

    this.hideMenu()
  }

  render() {
    const { removePost, updatePost, isCorrectUser, availableOn, impressions, status, postId, userId, currentUser, post, content, imageUrl } = this.props

    const shown = "dropdown-content showMenu"
    const hidden = "dropdown-content"
    const menu = (
      <div className="dropdown" ref={node => this.node = node}>
        <button onClick={this.toggleMenu} className="dropbtn"><i className="ellipsis fas fa-ellipsis-h"></i></button>
        <div className={this.state.showMenu ? shown : hidden}>
          <Link to={{
            pathname: `/users/${userId}/posts/${postId}/update`,
            state: {
              content,
              imageUrl,
              userId,
              postId
            }
          }}>
            Update Post
          </Link>
          <Link to="#" onClick={removePost}>Delete Post</Link>
        </div>
      </div>
    )
    return isCorrectUser ? menu : (<div ref={node => this.node = node}></div>)
  }
}

export default PostMenu
