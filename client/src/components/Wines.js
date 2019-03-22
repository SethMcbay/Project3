import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Wines extends Component {
  state = {
      Wines: [],
      newWine: {
          name: '',
          description: ''
      },
      isWineFormDisplayed: false
  }

  componentDidMount = () => {
    axios.get('/api/v1').then(res => {
        this.setState({Wines: res.data})
    })
  }

  toggleCreatureForm = () => {
      this.setState((state, props) => {
          return ({isWineFormDisplayed: !state.isWineFormDisplayed})
      })
  }

  handleChange = (e) => {
    const cloneNewWine = {...this.state.newCreature}
    cloneNewWine[e.target.name] = e.target.value
    this.setState({newCreature: cloneNewWine})
  }

  createWine = (e) => {
    e.preventDefault()
    axios
        .post('/api/v1', {
            name: this.state.newWine.name,
            description: this.state.newWine.description
        })
        .then(res => {
            const wineList = [...this.state.creatures]
            wineList.unshift(res.data)
            this.setState({
                newWine: {
                    name: '',
                    year: '',
                    location: '',
                    price: '',
                    type: '',
                    vintner: '',
                    rating: '',

                },
                isWineFormDisplayed: false,
                Wines: wineList
            })
        })

  }

  render() {
    return (
      <div>
        <h1>Wine Cellar</h1>
        {
            this.state.wine.map(wine => {
                return (
                    <div key={wine._id}>
                        <Link
                            to={`/${wine._id}`}
                        >
                            {wine.name}
                        </Link>
                    </div>
                )
            })
        }
        <button onClick={this.toggleCreatureForm}>+ New Wine</button>
        {
            this.state.isWineFormDisplayed
                ? <form onSubmit={this.createWine}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            onChange={this.handleChange}
                            value={this.state.newWine.name}
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            type="text"
                            name="description"
                            onChange={this.handleChange}
                            value={this.state.newWine.description}
                        />
                    </div>
                    <button>Create</button>
                </form>
                : null
        }
      </div>
    )
  }
}

export default Wines