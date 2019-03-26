import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';
import axios from "axios";

class User extends Component {
  state = {
    user: {
      name: '',
      age: '',
      wineprefernce: '',
      email: '',
      winecellar: [{
        name: '',
        region: '',
        type: '',
        year: '',
        rating: '',
        description: ''
      }]
    },
    redirectToHome: false,
    isEditFormDisplayed: false
  }

  componentDidMount = () => {
    console.log(this.props.match.params.userId)
    axios.get(`/api/v1/user/${this.props.match.params.userId}`).then(res => {

      this.setState({ user: res.data })
    })
  }


  deleteUser = (userId) => {
    axios.delete(`/api/v1/user/${userId}`).then(res => {
      this.setState({ redirectToHome: true })
    })
  }

  toggleEditForm = () => {
    this.setState((state, props) => {
      return { isEditFormDisplayed: !state.isEditFormDisplayed }
    })
  }

  handleChange = (e) => {
    const cloneUser = { ...this.state.user }
    cloneUser[e.target.name] = e.target.value
    this.setState({ user: cloneUser })
  }

  updateUser = (e) => {
    e.preventDefault()
    axios
      .put(`/api/v1/user/${this.props.match.params.userId}`, {
        name: this.state.user.name,
        email: this.state.user.email
      })
      .then(res => {
        this.setState({ users: res.data, isEditFormDisplayed: false })
      })
  }

  render() {
    if (this.state.redirectToHome) {
      return (<Redirect to="/" />)
      
    }
    // const users = this.state.users.map((user, i) => {
    //   return (
    //     <div key={i}>
    //       <div>
    //         Name: {user.name}
    //       </div>
    //       <div>
    //         Email: {user.email}
    //       </div>
    //       <button onClick={() => this.deleteUser(user._id)}>Delete</button>
    //     </div>
    //   )
    // })

    return (
      <div>
        <Link to="/">Back to User's Home</Link>
        <h1>User</h1>
        <button onClick={this.toggleEditForm}>Edit</button>
        {
          this.state.isEditFormDisplayed
            ? <form onSubmit={this.updateUser}>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  onChange={this.handleChange}
                  value={this.state.user.name}
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <textarea
                  id="email"
                  name="email"
                  onChange={this.handleChange}
                  value={this.state.user.email}
                />
              </div>
              <button>Update</button>
            </form>
            : <div>
              <div>Name: {this.state.user.name}</div>
              <div>Email: {this.state.user.email}</div>
              <div>WINEEEEE: {this.state.user.winecellar.map((wine, i)=>{
                return(
                  <div key={i}>
                    {wine.name}
                    {/* fill in the rest off the wine info */}

                  </div>
                )

              }) }</div>


{/* make a form where they can post wine to axios: api v1 user userId userwine */}
              <button onClick={() => this.deleteUser(this.state.user._id)}>Delete</button>
            </div>
        }
         <Link to="/wines">My Wine Cellar</Link>
      </div>
    )
  }
}



export default User