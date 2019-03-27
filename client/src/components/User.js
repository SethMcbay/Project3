import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';
import axios from "axios";
import Wines from "./Wines";

class User extends Component {
  state = {
    user: {
      name: '',
      age: '',
      wineprefernce: '',
      email: '',
      winecellar: []
    },
    newUserWine: {
      name: '',
      region: '',
      type: '',
      year: '',
      rating: '',
      description: ''
    },
    redirectToHome: false,
    isAddFormDisplayed: false
  }

  componentDidMount = () => {
    // console.log(this.props.match.params.userId)
    // axios.get(`/api/v1/user/${this.props.match.params.userId}`).then(res => {
    //   console.log(res.data)
    //   this.setState({ user: res.data })
    // })
    this.getUser()
  }

  getUser = () => {
    axios.get(`/api/v1/user/${this.props.match.params.userId}`).then(res => {
      // console.log(res.data)
      this.setState({ user: res.data })
    })
  }


  deleteUser = (userId) => {
    axios.delete(`/api/v1/user/${userId}`).then(res => {
      this.setState({ redirectToHome: true })
    })
  }

  toggleAddForm = () => {
    this.setState((state, props) => {
      return { isAddFormDisplayed: !this.state.isAddFormDisplayed }
    })
  }

  // handleChange = (e) => {
  //   const cloneUser = { ...this.state.user }
  //   cloneUser[e.target.name] = e.target.value
  //   this.setState({ user: cloneUser })
  // }
  // handleChange = (e) => {
  //   const cloneUser = { ...this.state.user }
  //   cloneUser[e.target.name] = e.target.value
  //   this.setState({ user: cloneUser })
  // }
  handleChange = (e) => {
    const newWine = {...this.state.newUserWine}
    newWine[e.target.name] = e.target.value
    this.setState({newUserWine: newWine})
  }
  

  createUserWine = (e) => {
    e.preventDefault()
    axios.post(`/api/v1/user/${this.props.match.params.userId}/userwine`, {
      name: this.state.newUserWine.name,
      region: this.state.newUserWine.region,
      type: this.state.newUserWine.type,
      year: this.state.newUserWine.year,
      rating: this.state.newUserWine.rating,
      description: this.state.newUserWine.description
    })
    this.setState({isAddFormDisplayed: !this.state.isAddFormDisplayed})
    this.getUser()
    console.log('got user')
  }

  updateUser = (e) => {
    e.preventDefault()
    axios
      .put(`/api/v1/user/${this.props.match.params.userId}`, {
        name: this.state.user.name,
        email: this.state.user.email
      })
      .then(res => {
        this.setState({ users: res.data, isAddFormDisplayed: false })
      })
  }

  render() {
    if (this.state.redirectToHome) {
      return (<Redirect to="/" />)
      
    }
    

    return (
      <div>
        <Link to="/">Back to User's Home</Link>
        <h1>User</h1>
        <button onClick={this.toggleAddForm}>Add Wine</button>
        {
          this.state.isAddFormDisplayed
            ?
            <div>
            <form>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  onChange={this.handleChange}
                  value={this.state.newUserWine.name}
                />
              </div>
              <div>
                <label htmlFor="region">Region</label>
                <textarea
                  id="region"
                  name="region"
                  onChange={this.handleChange}
                  value={this.state.newUserWine.region}
                />
              </div>
              <div>
                <label htmlFor="type">Type</label>
                <textarea
                  id="type"
                  name="type"
                  onChange={this.handleChange}
                  value={this.state.newUserWine.type}
                />
              </div>
              <div>
                <label htmlFor="year">Year</label>
                <input
                  id="year"
                  name="year"
                  type="number"
                  onChange={this.handleChange}
                  value={this.state.newUserWine.year}
                />
              </div>
              <div>
                <label htmlFor="rating">Rating</label>
                <input
                  id="rating"
                  name="rating"
                  type="number"
                  onChange={this.handleChange}
                  value={this.state.newUserWine.rating}
                />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  onChange={this.handleChange}
                  value={this.state.newUserWine.description}
                />
              </div>
              <button onClick={this.createUserWine}>Submit</button>
            </form>
            </div>

            : <div>
              <div>Name: {this.state.user.name}</div>
              <div>Email: {this.state.user.email}</div>
              <div>Wine: {this.state.user.winecellar.map((wine, i) => {
                return(
                  <div key={i}>
                    <Link to={`/wines/${wine._id}`}>{wine.name}</Link>
                    {wine.region}
                    {wine.type}
                    {wine.year}
                    {wine.rating}
                    {wine.description} 
                  </div>
                )

              }) }</div>


{/* make a form where they can post wine to axios: api v1 user userId userwine */}
                 
              <button onClick={() => this.deleteUser(this.state.user._id)}>Delete</button>
            </div>
        }

        {/* <Wines userId={this.props.match.params.userId}/> */}x
         
      </div>
    )
  }
}



export default User