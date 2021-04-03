import React, { Component } from "react"
import { Link } from "react-router-dom"

class MealItemMenu extends Component {
  constructor(props){
    super(props)
    this.state = {
      showMenu: false,
      showDialog: false
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

  showDialog = () => {
    this.setState({
      showMenu: false,
      showDialog: true
    })
  }
  hideDialog = () => {
    this.setState({
      showDialog: false
    })
  }

  render() {

    const { removeMeal, updateMeal, isCorrectUser, availableOn, impressions, status, mealId, userId, category, currentUser, name, restaurant, imageUrl } = this.props

    const dialog =
    <dialog className="deleteItemDialog" open={this.state.showDialog}>Are you sure you want to delete this?       <p><button className="btn btn-primary" onClick={removeMeal}>Yes, Delete Now</button></p>
    <p><button className="btn btn-danger" onClick={this.hideDialog}>Nevermind</button></p>
    </dialog>

    const personalRecommendationUrl = `/users/${currentUser}/personalRecommendation`

    const shown = "dropdown-content showMenu"
    const hidden = "dropdown-content"
    const menu = (
      <div className="dropdown" ref={node => this.node = node}>
        <button onClick={this.toggleMenu} className="dropbtn"><i className="ellipsis fas fa-ellipsis-h"></i></button>
        <div className={this.state.showMenu ? shown : hidden}>
          <Link to={{
            pathname: `/users/${userId}/meals/${mealId}/update`,
            state: {
              name,
              restaurant,
              imageUrl,
              impressions,
              status,
              userId,
              mealId
            }
          }}>
            Update
          </Link>
          <Link to="#" onClick={this.showDialog}>Delete</Link>

        <Link to={{
          pathname: personalRecommendationUrl,
          state: {
            name,
            category,
            mealId,
            restaurant
          }}}>Recommend To A Friend</Link>
        </div>
        {dialog}
      </div>
    )
    return isCorrectUser ? menu : (<div ref={node => this.node = node}></div>)
  }
}

export default MealItemMenu
