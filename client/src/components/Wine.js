import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';
import axios from "axios";

class Wine extends Component {
  state = {
      wine: {
          name: '',
          Description: ''
      },
      redirectToHome: false,
      isEditFormDisplayed: false
  }

  componentDidMount = () => {
      axios.get(`/api/v1/wine/${this.props.match.params.id}`).then(res => {
        this.setState({wine: res.data})
      })
  }

  deleteWine = () => {
      axios.delete(`/api/v1/wine/${this.props.match.params.id}`).then(res => {
          this.props.history.goBack()
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
            Description: this.state.wine.Description
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
        <Link to="/wines">Back to Wines Home</Link>
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
                            value={this.state.wine.name}
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
                      Type: {this.state.wine.type}
                    </div>
                    <div>
                        Description: {this.state.wine.description}
                    </div>
                    <div>
                      Region: {this.state.wine.region}
                    </div>
                    <div> 
                      Year: {this.state.wine.year}
                    </div>
                    <div>
                      Rating: {this.state.wine.rating}
                    </div>
                    <button onClick={this.deleteWine}>Delete</button>
                </div>
        }
      </div>
    );
  }
}

export default Wine;
