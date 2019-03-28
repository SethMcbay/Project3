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
      console.log(this.props.match.params.id)
      this.getWines()
  }

  getWines = async () => {
      const res = await axios.get(`/api/v1/wines/${this.props.match.params.id}`)
      this.setState({wine: res.data})
  }

  deleteWine = () => {
      axios.delete(`/api/v1/wines/${this.props.match.params.id}`).then(res => {
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
        {this.state.wine.name}<br></br>Name
       
      </div> 
    );
  }
}

export default Wine;
