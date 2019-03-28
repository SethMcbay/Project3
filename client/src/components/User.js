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
    updatedUser: {
      name: '',
      email: ''
    },
    redirectToHome: false,
    isAddFormDisplayed: false,
    showEditForm: false,
  }

  componentDidMount = () => {
    this.getUser()
  }

  getUser = () => {
    axios.get(`/api/v1/user/${this.props.match.params.userId}`).then(res => {
      this.setState({ user: res.data })
    })
  }


  deleteUser = (userId) => {
    axios.delete(`/api/v1/user/${userId}`).then(res => {
      this.setState({ redirectToHome: true })
    })
  }

  deleteWine = (e, wineId) => {
    console.log(e)
    console.log(wineId)
    e.preventDefault()
    axios.delete(`/api/v1/user/${this.props.match.params.userId}/userWine/${wineId}`).then(res => {
      this.getUser()
      // this.setState({ redirectToHome: true })
    })
  }

  toggleAddForm = () => {
    this.setState((state, props) => {
      return { isAddFormDisplayed: !this.state.isAddFormDisplayed }
    })
  }

  toggleEditForm = () => {
    this.setState((state, props) => {
      return { showEditForm: !this.state.showEditForm }
    })
  }

  handleChange = (e) => {
    const newWine = {...this.state.newUserWine}
    newWine[e.target.name] = e.target.value
    this.setState({newUserWine: newWine})
  }

  handleUserEditChange = (e) => {
    const updatedUser = {...this.state.user}
    updatedUser[e.target.name] = e.target.value
    this.setState({ user: updatedUser})
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
        this.setState({ users: res.data, showEditForm: false })
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
                    <Link to={`/user/${this.props.match.params.userId}/userwine/${wine._id}`}>{wine.name}</Link>
                    <p>{wine.region}</p>
                    <p>{wine.type}</p>
                    <p>{wine.year}</p>
                    <p>{wine.rating}</p>
                    <p>{wine.description}</p>
                    <button onClick= {(e)=>this.deleteWine(e, wine._id)}>Delete</button>
                  </div>
                )

              }) }</div>
              <button onClick={this.toggleEditForm}>Edit User</button>
              {
                this.state.showEditForm ?
                <form onSubmit={this.updateUser}>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  onChange={this.handleUserEditChange}
                  value={this.state.user.name}
                />
              </div>
              <div>
              <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  type="text"
                  name="email"
                  onChange={this.handleUserEditChange}
                  value={this.state.user.email}
                />
              </div>
              <button>Update</button>
              </form>
              : null
              }
              <button onClick={() => this.deleteUser(this.state.user._id)}>Delete</button>
            </div>
        }
         
      </div>
    )
  }
}



export default User