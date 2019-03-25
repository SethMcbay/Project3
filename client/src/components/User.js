import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';
import axios from "axios";

class User extends Component {
  state = {
    user: {},
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
    const cloneUser = { ...this.state.users }
    cloneUser[e.target.name] = e.target.value
    this.setState({ users: cloneUser })
  }

  updateUser = (e) => {
    e.preventDefault()
    axios
      .put(`/api/v1/${this.props.match.params.id}`, {
        name: this.state.users.name,
        description: this.state.users.description
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
                  value={this.state.User.name}
                />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  onChange={this.handleChange}
                  value={this.state.User.description}
                />
              </div>
              <button>Update</button>
            </form>
            : <div>
              <div>Name: {this.state.user.name}</div>
              <div>Email: {this.state.user.email}</div>
              <button onClick={() => this.deleteUser(this.state.user._id)}>Delete</button>
            </div>
        }
      </div>
    )
  }
}



export default User