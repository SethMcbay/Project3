import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Wines extends Component {
    state = {
        wines: [],
        newWine: {
            name: '',
            year: '',
            location: '',
            price: '',
            type: '',
            vintner: '',
            rating: '',
        },
        isWineFormDisplayed: false
    }

    componentDidMount = () => {
        // axios.get('/api/v1/wine').then(res => {
        //     this.setState({ wines: res.data })
        // })
        this.getWines()
    }

    getWines = () => {
        axios.get('/api/v1/wine').then(res => {
            this.setState({ wines: res.data })
        })
    }

    toggleWineForm = () => {
        this.setState((state, props) => {
            return ({ isWineFormDisplayed: !state.isWineFormDisplayed })
        })
    }

    handleChange = (e) => {
        const cloneNewWine = { ...this.state.newWine }
        cloneNewWine[e.target.name] = e.target.value
        this.setState({ newWine: cloneNewWine })
    }

    createWine = (e) => {
        e.preventDefault()
        axios
            .post('/api/v1/wine', {
                name: this.state.newWine.name,
                description: this.state.newWine.description
            })
            .then(res => {
                const wineList = [...this.state.wines]
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
            }).then(() => {
                this.getWines()
            })

    }

    render() {
        return (
            <div>
                <h1>Wine Cellar</h1>
                {
                    this.state.wines.map(wine => {
                        return (
                            <div key={wine._id}>
                                <Link
                                    to={`/wines/${wine._id}`}
                                >
                                    {wine.name}
                                </Link>
                            </div>
                        )
                    })
                }
                <button onClick={this.toggleWineForm}>New Wine</button>
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
                                <label htmlFor="vintner">Vintner</label>
                                <textarea
                                    id="vintner"
                                    type="text"
                                    name="vintner"
                                    onChange={this.handleChange}
                                    value={this.state.newWine.vintner}
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