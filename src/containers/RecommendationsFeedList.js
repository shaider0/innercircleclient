import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMovies, removeMovie, updateMovie } from "../store/actions/movies";
import { fetchTvshows, removeTvshow, updateTvshow } from "../store/actions/tvshows";
import { fetchRestaurants, removeRestaurant, updateRestaurant } from "../store/actions/restaurants";
import { fetchMeals, removeMeal, updateMeal } from "../store/actions/meals";
import { fetchDestinations, removeDestination, updateDestination } from "../store/actions/destinations";

import MovieItem from "../components/MovieItem";
import TvshowItem from "../components/TvshowItem";
import RestaurantItem from "../components/RestaurantItem";
import MealItem from "../components/MealItem";
import DestinationItem from "../components/DestinationItem";

import { Link } from "react-router-dom"

class RecommendationsFeedList extends Component{
  constructor(props) {
    super(props);

    this.state = {
      filterMenu: true,
      showMovies: true,
      showMoviesOnly: false,
      showTvshows: true,
      showTvshowsOnly: false,
      showRestaurants: true,
      showRestaurantsOnly: false,
      showMeals: true,
      showMealsOnly: false,
      showDestinations: true,
      showDestinationsOnly: false,
      singleUserContent: "",
      showRecommendations: true,
      showBookmarks: true
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
    this.props.fetchMovies(currentUser);
    this.props.fetchTvshows(currentUser);
    this.props.fetchRestaurants(currentUser);
    this.props.fetchMeals(currentUser);
    this.props.fetchDestinations(currentUser);
  }

  render() {

    const { movies, removeMovie, updateMovie, tvshows, removeTvshow, updateTvshow, meals, removeMeal, updateMeal, restaurants, removeRestaurant, updateRestaurant, destinations, removeDestination, updateDestination, currentUser } = this.props;

// add destinations
    let items = [...movies, ...tvshows, ...meals, ...restaurants, ...destinations ]

    if (!this.state.showMovies) {
      items = items.filter(item => item.category !== "movie")
    }

    if (this.state.showMoviesOnly) {
      items = items.filter(item => item.category === "movie")
    }

    if (!this.state.showTvshows) {
      items = items.filter(item => item.category !== "tv show")
    }

    if (this.state.showTvshowsOnly) {
    items = items.filter(item => item.category === "tv show")
    }

    if (!this.state.showMeals) {
      items = items.filter(item => item.category !== "meal")
    }

    if (this.state.showMealsOnly) {
    items = items.filter(item => item.category === "meal")
    }

    if (!this.state.showRestaurants) {
      items = items.filter(item => item.category !== "restaurant")
    }

    if (this.state.showRestaurantsOnly) {
    items = items.filter(item => item.category === "restaurant")
    }

    if (!this.state.showDestinations) {
      items = items.filter(item => item.category !== "destination")
    }

    if (this.state.showDestinationsOnly) {
    items = items.filter(item => item.category === "destination")
    }

    if (this.state.singleUserContent) {
      items = items.filter(item => item.user.username === this.state.singleUserContent)
    }

    if (!this.state.showRecommendations) {
      items = items.filter(item => item.status !== 'recommendation')
    }

    if (!this.state.showBookmarks) {
      items = items.filter(item => item.status !== 'bookmark')
    }

    let sortedItems = items.sort((a, b) => (a.updatedAt > b.updatedAt) ? -1 : 1)
    let feedList = sortedItems.map(m => {
      if (m.category === 'tv show'){
      return (<TvshowItem
          key={m._id}
          date={m.updatedAt}
          category={m.category}
          title={m.title}
          availableOn={m.availableOn}
          impressions={m.impressions}
          status={m.status}
          tvshowId={m._id}
          username={m.user.username}
          userId={m.user._id}
          profileImageUrl={m.user.profileImageUrl}
          removeTvshow={removeTvshow.bind(this, m.user._id, m._id)}
          updateTvshow={updateTvshow.bind(this, m.user._id, m._id)}
          currentUser={currentUser}
          isCorrectUser={currentUser === m.user._id}
      />)}
      else if (m.category === 'movie') {
      return (<MovieItem
        key={m._id}
        date={m.updatedAt}
        category={m.category}
        title={m.title}
        availableOn={m.availableOn}
        impressions={m.impressions}
        status={m.status}
        movieId={m._id}
        username={m.user.username}
        userId={m.user._id}
        profileImageUrl={m.user.profileImageUrl}
        removeMovie={removeMovie.bind(this, m.user._id, m._id)}
        updateMovie={updateMovie.bind(this, m.user._id, m._id)}
        currentUser={currentUser}
        isCorrectUser={currentUser === m.user._id}
      />)}

      else if (m.category === 'meal') {
      return (<MealItem
        key={m._id}
        date={m.updatedAt}
        category={m.category}
        name={m.name}
        restaurant={m.restaurant}
        imageUrl={m.imageUrl}
        impressions={m.impressions}
        status={m.status}
        mealId={m._id}
        username={m.user.username}
        userId={m.user._id}
        profileImageUrl={m.user.profileImageUrl}
        removeMeal={removeMeal.bind(this, m.user._id, m._id)}
        updateMeal={updateMeal.bind(this, m.user._id, m._id)}
        currentUser={currentUser}
        isCorrectUser={currentUser === m.user._id || currentUser === m.user}
      />)}


      else if (m.category === 'restaurant') {
      return (<RestaurantItem
        key={m._id}
        date={m.updatedAt}
        category={m.category}
        name={m.name}
        imageUrl={m.imageUrl}
        impressions={m.impressions}
        status={m.status}
        restaurantId={m._id}
        username={m.user.username}
        userId={m.user._id}
        profileImageUrl={m.user.profileImageUrl}
        removeRestaurant={removeRestaurant.bind(this, m.user._id, m._id)}
        updateRestaurant={updateMeal.bind(this, m.user._id, m._id)}
        currentUser={currentUser}
        isCorrectUser={currentUser === m.user._id || currentUser === m.user}
      />)}

      else if (m.category === 'destination') {
      return (<DestinationItem
        key={m._id}
        date={m.updatedAt}
        category={m.category}
        city={m.city}
        state={m.state}
        country={m.country}
        imageUrl={m.imageUrl}
        impressions={m.impressions}
        status={m.status}
        destinationId={m._id}
        username={m.user.username}
        userId={m.user._id}
        profileImageUrl={m.user.profileImageUrl}
        removeDestination={removeDestination.bind(this, m.user._id, m._id)}
        updateDestination={updateMeal.bind(this, m.user._id, m._id)}
        currentUser={currentUser}
        isCorrectUser={currentUser === m.user._id || currentUser === m.user}
      />)}

    }
  );

    const filterMenu = (
      <div className="filterMenu">
          <p className="friendFilter"><strong>Username: </strong>
            <input
              type="text"
              onChange={this.handleInputChange}
              name="singleUserContent"
              value={this.state.singleUserContent}
              />
          </p>

            <p className="typeFilter">Type:
              <input
                className="filterCheckbox"
                type="checkbox"
                onChange={this.handleInputChange}
                name="showRecommendations"
                checked={this.state.showRecommendations}
                />
                <i className="fas fa-heart"></i> Recommendations
              <input
                className="filterCheckbox"
                type="checkbox"
                onChange={this.handleInputChange}
                name="showBookmarks"
                checked={this.state.showBookmarks}
                />
                <i className="fas fa-bookmark"></i> Bookmarks
            </p>

          <p className="includeFilter">
          Include: (choose multiple)
          <input
            className="filterCheckbox"
            type="checkbox"
            onChange={this.handleInputChange}
            name="showMovies"
            checked={this.state.showMovies}
            />
          <i className="fas light fa-film"></i> Movies
          <input
            className="filterCheckbox"
            type="checkbox"
            onChange={this.handleInputChange}
            name="showTvshows"
            checked={this.state.showTvshows}
            />
          <i className="fas light fa-tv"></i> TV Shows
          <input
            className="filterCheckbox"
            type="checkbox"
            onChange={this.handleInputChange}
            name="showRestaurants"
            checked={this.state.showRestaurants}
            />
          <i className="fas light fa-utensils"></i> Restaurants
          <input
            className="filterCheckbox"
            type="checkbox"
            onChange={this.handleInputChange}
            name="showMeals"
            checked={this.state.showMeals}
            />
          <i className="fas light fa-hamburger"></i> Meals
          <input
            className="filterCheckbox"
            type="checkbox"
            onChange={this.handleInputChange}
            name="showDestinations"
            checked={this.state.showDestinations}
            />
          <i className="fas light fa-plane"></i> Destinations

          </p>

          <p className="onlyFilter">
          <span>Show Only: (choose one)</span>
          <input
            className="filterCheckbox"
            type="checkbox"
            onChange={this.handleInputChange}
            name="showMoviesOnly"
            checked={this.state.showMoviesOnly}
            disabled={this.state.showTvshowsOnly || this.state.showMealsOnly || this.state.showRestaurantsOnly || this.state.showDestinationsOnly}
            />
          <i className="fas light fa-film"></i> Movies

          <input
            className="filterCheckbox"
            type="checkbox"
            onChange={this.handleInputChange}
            name="showTvshowsOnly"
            checked={this.state.showTvshowsOnly}
            disabled={this.state.showMoviesOnly || this.state.showMealsOnly || this.state.showRestaurantsOnly || this.state.showDestinationsOnly}
            />
          <i className="fas light fa-tv"></i> TV Shows

          <input
            className="filterCheckbox"
            type="checkbox"
            onChange={this.handleInputChange}
            name="showRestaurantsOnly"
            checked={this.state.showRestaurantsOnly}
            disabled={this.state.showTvshowsOnly || this.state.showMoviesOnly || this.state.showMealsOnly || this.state.showDestinationsOnly}
            />
          <i className="fas light fa-utensils"></i> Restaurants

          <input
            className="filterCheckbox"
            type="checkbox"
            onChange={this.handleInputChange}
            name="showMealsOnly"
            checked={this.state.showMealsOnly}
            disabled={this.state.showTvshowsOnly || this.state.showMoviesOnly || this.state.showRestaurantsOnly || this.state.showDestinationsOnly}
            />
          <i className="fas light fa-hamburger"></i> Meals

          <input
            className="filterCheckbox"
            type="checkbox"
            onChange={this.handleInputChange}
            name="showDestinationsOnly"
            checked={this.state.showDestinationsOnly}
            disabled={this.state.showTvshowsOnly || this.state.showMoviesOnly || this.state.showRestaurantsOnly || this.state.showMealsOnly}
            />
          <i className="fas light fa-plane"></i> Destinations

          </p>

        </div>
    )
    return (
      <div className="feed">
        <br/>
        <div className="feedButtons">

          <Link to={`/users/${currentUser}/create-item`} className="createNewButton"><i className="fas fa-plus"></i>        Create New</Link>

          <button className="searchButton" onClick={this.toggleFilterMenu}><i className="fas fa-search">
            </i> Show/Hide Filters
          </button>

        </div>
        {this.state.filterMenu ? filterMenu : null}
        <div>
          <ul className="list-group">
            {feedList}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movies: state.movies,
    tvshows: state.tvshows,
    meals: state.meals,
    restaurants: state.restaurants,
    destinations: state.destinations,
    currentUser: state.currentUser.user.id
  };
}

export default connect(mapStateToProps, {
  fetchMovies,
  removeMovie,
  updateMovie,
  fetchTvshows,
  removeTvshow,
  updateTvshow,
  fetchMeals,
  removeMeal,
  updateMeal,
  fetchRestaurants,
  removeRestaurant,
  updateRestaurant,
  fetchDestinations,
  removeDestination,
  updateDestination
})(
  RecommendationsFeedList
);
