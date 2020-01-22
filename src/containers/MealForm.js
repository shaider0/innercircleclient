import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"
import { updateMeal, postNewMeal } from "../store/actions/meals";


class MealForm extends Component {
  constructor(props) {
    super(props);
    if(this.props.type === "update") {
      this.state = this.props.state
    } else {
      this.state = {
        name: "",
        restaurant: "",
        impressions: "",
        image: null,
        status: "recommendation",
        message: ""
      }
    }
  }

  resetMessage = () => {
    this.setState({
      message: ""
    })
  }

  handleNewMeal = event => {
    event.preventDefault();

    this.props.postNewMeal(this.state)
      .then(res => {
        if(res==="success") {
          this.setState({
            name: "",
            restaurant: "",
            impressions: "",
            image: null,
            status: "recommendation",
            message: "Meal Successfully Added"
      });
    }
    })
    .then(setTimeout(this.resetMessage, 10000))
    };

  handleUpdatedMeal = event => {
    event.preventDefault();
    this.props.updateMeal(this.state)
    .then(this.setState({
      name: "",
      restaurant: "",
      impressions: "",
      image: null,
      status: "recommendation",
    }))
    .then(this.props.history.push("/"))
  };

  render() {
    const { meals } = this.props
    const mealNames = meals.map(meal => {
      return meal.name
    })
    let sortedMeals = mealNames.sort((a, b) => (a > b) ? -1 : 1)
    let uniqueMeals = [...new Set(sortedMeals)]
    const mealsDataList = (
      uniqueMeals.map(meal => {
        return <option value={meal} key={meal}/>
      })
    )

    let handler = this.handleNewMeal
    let buttonText = "Add Meal"
    if(this.props.type === "update") {
      buttonText = "Save Updates"
      handler = this.handleUpdatedMeal
    }
    return (
      <form className="mealForm" onSubmit={handler}>
        {this.props.errors.message && (
          <div className="alert alert-danger">{this.props.errors.message}</div>
        )}

        <h5>Choose a Type</h5>
        <select
          className="form-control"
          value={this.state.status}
          onChange={e => this.setState({ status: e.target.value })}
        >
          <option value="recommendation">Recommendation</option>
          <option value="bookmark">Bookmark</option>
        </select>
        <i className="fas fa-hamburger"></i>
        <h5>Enter Meal Information</h5>
        <datalist id="meals">
          {mealsDataList}
        </datalist>
        <input
          list="meals"
          required
          type="text"
          placeholder="Name"
          className="form-control"
          value={this.state.name}
          onChange={e => this.setState({ name: e.target.value })}
        />

        <input
          required
          type="text"
          placeholder="Restaurant"
          className="form-control"
          value={this.state.restaurant}
          onChange={e => this.setState({ restaurant: e.target.value })}
        />

        {this.state.status === "recommendation" ?
          <div>
            <input
              type="text"
              placeholder="Optional - Your Impressions (120 characters max)"
              className="form-control"
              value={this.state.impressions}
              onChange={e => this.setState({ impressions: e.target.value })}
            />
          </div>
          : null
        }

        <h5>Upload a Photo: </h5>
        <input
          type="file"
          onChange={e => this.setState({ image: e.target.files})}
        />

        <button type="submit" className="btn btn-primary">
          {buttonText}
        </button>
        {this.state.message ? <p className="uiMessage">{this.state.message}</p> : null}
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors,
    meals: state.meals
  };
}

export default withRouter(connect(mapStateToProps, { postNewMeal, updateMeal })(MealForm));
