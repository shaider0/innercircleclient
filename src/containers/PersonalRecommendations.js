import React, { Component } from "react";
import { connect } from "react-redux";
import PersonalRecommendationItem from "../components/PersonalRecommendationItem"
import { fetchPersonalRecommendations } from "../store/actions/personalRecommendations"


class PersonalRecommendations extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { currentUser } = this.props
    this.props.fetchPersonalRecommendations(currentUser)
  }
  render(){
    const { personalRecommendations } = this.props
    if (personalRecommendations.length === 0) {
      return <div className="personalRecMessage">No personalized recommendations at this time. Check back soon!</div>
    }
    let sortedItems = personalRecommendations.sort((a, b) => (a.updatedAt > b.updatedAt) ? -1 : 1)
    let personalRecommendationsList = sortedItems.map(m => {
      return (
        <div key={m._id}>
          <PersonalRecommendationItem
            date={m.createdAt}
            sender={m.sender}
            item={m.item}
            category={m.category}
            id={m._id}
            />
        </div>
      )
    })
  return (
    <div>
      {personalRecommendationsList}
    </div>
  )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.user.id,
    errors: state.errors,
    personalRecommendations: state.personalRecommendations
  };
}

export default connect(mapStateToProps, { fetchPersonalRecommendations })(PersonalRecommendations);
