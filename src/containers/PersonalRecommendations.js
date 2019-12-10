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
      return <div>None at this time</div>
    }
    let personalRecommendationsList = personalRecommendations.map(m => {
      return (
        <div key={m._id} className="personalRecommendationItem">
          <PersonalRecommendationItem
            date={m.createdAt}
            sender={m.sender.username}
            item={m.item}
            category={m.category}
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
