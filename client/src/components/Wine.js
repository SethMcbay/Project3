import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';
import axios from "axios";

class Wine extends Component {
  state = {
      wine: {
          name: '',
          description: ''
      },
      redirectToHome: false,
      isEditFormDisplayed: false
  }

  componentDidMount = () => {
      axios.get(`/api/v1/wine/${this.props.match.params.id}`).then(res => {
        console.log(res.data)  
        this.setState({wine: res.data})
      })
  }

  deleteCreature = () => {
      axios.delete(`/api/v1/${this.props.match.params.id}`).then(res => {
          this.setState({redirectToHome: true})
      })
  }

  toggleEditForm = () => {
      this.setState((state, props) => {
          return {isEditFormDisplayed: !state.isEditFormDisplayed}
      })
  }

  handleChange = (e) => {
      const cloneWine = {...this.state.wine}
      cloneWine[e.target.name] = e.target.value
      this.setState({wine: cloneWine})
  }

  updateCreature = (e) => {
      e.preventDefault()
      axios
        .put(`/api/v1/${this.props.match.params.id}`, {
            name: this.state.wine.name,
            description: this.state.wine.description
        })
        .then(res => {
            this.setState({wine: res.data, isEditFormDisplayed: false})
        })
  }

  render() {
    if(this.state.redirectToHome) {
        return (<Redirect to="/api/v1/wines" />)
    }

    return (
      <div>
        <Link to="/api/v2/wines">Back to Wines Home</Link>
        <h1>Wine</h1>
        <button onClick={this.toggleEditForm}>Edit</button>
        {
            this.state.isEditFormDisplayed
                ? <form onSubmit={this.updateWine}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            onChange={this.handleChange}
                            value={this.state.creature.name}
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            onChange={this.handleChange}
                            value={this.state.wine.description}
                        />
                    </div>
                    <button>Update</button>
                </form>
                : <div>
                    <div>
                        Name: {this.state.wine.name}
                    </div>
                    <div>
                        Description: {this.state.wine.description}
                    </div>
                    <button onClick={this.deleteWine}>Delete</button>
                </div>
        }
      </div>
    );
  }
}

export default Wine;
