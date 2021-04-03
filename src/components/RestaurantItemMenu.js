import React, { Component } from "react"
import { Link } from "react-router-dom"

class RestaurantItemMenu extends Component {
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
    const { removeRestaurant, updateRestaurant, isCorrectUser, availableOn, impressions, status, restaurantId, userId, category, currentUser, name, restaurant, imageUrl } = this.props

    const personalRecommendationUrl = `/users/${currentUser}/personalRecommendation`

    const shown = "dropdown-content showMenu"
    const hidden = "dropdown-content"
    const menu = (
      <div className="dropdown" ref={node => this.node = node}>
        <button onClick={this.toggleMenu} className="dropbtn"><i className="ellipsis fas fa-ellipsis-h"></i></button>
        <div className={this.state.showMenu ? shown : hidden}>
          <Link to={{
            pathname: `/users/${userId}/restaurants/${restaurantId}/update`,
            state: {
              name,
              imageUrl,
              impressions,
              status,
              userId,
              restaurantId
            }
          }}>
            Update
          </Link>
          <Link to="#" onClick={removeRestaurant}>Delete</Link>
        <Link to={{
          pathname: personalRecommendationUrl,
          state: {
            name,
            category,
            restaurantId
          }}}>Recommend To A Friend</Link>
        </div>
      </div>
    )
    return isCorrectUser ? menu : (<div ref={node => this.node = node}></div>)
  }
}

export default RestaurantItemMenu
