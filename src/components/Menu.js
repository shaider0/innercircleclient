import React, { Component } from "react"
import { Link } from "react-router-dom"

class Menu extends Component {
  constructor(props){
    super(props)
    this.state = {
      showMenu: false
    }
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu() {
    this.setState((prevState) => ({
      showMenu: !prevState.showMenu
    }))
  }

  render() {
    const { removeMovie, updateMovie, isCorrectUser, title, availableOn, impressions, status, movieId, userId, category, currentUser } = this.props

    const personalRecommendationUrl = `/users/${currentUser}/personalRecommendation`

    const shown = "dropdown-content showMenu"
    const hidden = "dropdown-content"
    const menu = (
      <div class="dropdown">
        <button onClick={this.toggleMenu} class="dropbtn"><i class="ellipsis fas fa-ellipsis-h"></i></button>
        <div class={this.state.showMenu ? shown : hidden}>
          <Link to={{
            pathname: `/users/${userId}/movies/${movieId}/update`,
            state: {
              title,
              availableOn,
              impressions,
              status,
              userId,
              movieId
            }
          }}>
            Update
          </Link>
          <Link to="#" onClick={removeMovie}>Delete</Link>
        <Link to={{
          pathname: personalRecommendationUrl,
          state: {
            title,
            category
          }}}>Recommend To A Friend</Link>
        </div>
      </div>
    )
    return isCorrectUser ? menu : null
  }
}

export default Menu
