import React, { Component } from 'react';
import axios from 'axios'


class userWines extends Component {
    state = {
        wine: {}
    }

    componentDidMount() {
        this.getWine()
    }


    getWine = async () => {
        const res = await axios.get(`/api/v1/user/${this.props.match.params.userId}/userwine/${this.props.match.params.id}`)
        const wine = res.data
        this.setState({ wine })
    }
    render() {

        return (
            <div>
                <h2>{this.state.wine.name}</h2>
                <p>{this.state.wine.region}</p>
                <p>{this.state.wine.vintner}</p>
                <p>{this.state.wine.type}</p>
                <p>{this.state.wine.rating}</p>
                <p>{this.state.wine.description}</p>
            </div>
        );
    }
}

export default userWines;
