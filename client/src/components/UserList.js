import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default class UserList extends Component {

    state = {
        users: []
    }

    componentDidMount(){
        this.getUsers()
    }

    getUsers = async () => {
        const res = await axios.get('/api/v1/user')
        const users = res.data
        this.setState({users})
    }

  render() {

    const users = this.state.users.map((user, i) => {
        return (
            <div key={i}>
                <Link to={`user/${user._id}`}>{user.name}</Link>
            </div>
        )
    })

    return (
      <div>
        {users}
      </div>
    )
  }
}
