import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'

class LogInPage extends Component {
    state = {
        users: [],
        user: {
            userName: '',
            email: ''
        },
        redirectToHome: false,
        createdUser: {}
    }

    componentDidMount = () => {
        this.getAllUsers()
    }

    getAllUsers = () => {
        axios.get('/api/users').then(res => {
            this.setState({users: res.data})
        })
    }

    createUser = () => {
        axios.post('/api/users', {user: this.state.user})
            .then(res => {
                console.log(res.data)
                this.setState({redirectToHome: true, createdUser: res.data})
            })
    }

    handleChange = (e) => {
        const newUser = {...this.state.user}
        newUser[e.target.name] = e.target.value
        this.setState({user: newUser})
    }

    handleSignUp = (e) => {
        e.preventDefault()
        this.createUser()
    }
    
    render() {
        if(this.state.redirectToHome === true) {
            return (<Redirect to={`/user/${this.state.createdUser._id}`} />)
        }

        return (
            <div>
                <h1>Log in Page</h1>
                

                
                {
                    this.state.users.map((user) => {
                        return (
                            <Link
                                to={`/user/${user._id}`}
                                key={user._id}
                            >
                            {user.userName}
                            </Link>
                        )
                    })
                }

                
                <form onSubmit={this.handleSignUp}>
                    <div>
                        <label htmlFor="userName">Username</label>
                        <input
                            type="text"
                            name="userName"
                            onChange={this.handleChange}
                            value={this.state.user.userName}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            onChange={this.handleChange}
                            value={this.state.user.password}
                        />
                    </div>
                    <button>Create User</button>
                </form>
            </div>
        )
    }
}

export default LogInPage