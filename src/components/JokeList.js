import React, { Component } from "react";
import Joke from "./Joke";
import axios from "axios";
import uuid from "uuid/v4";
import "../styles/JokeList.css";

class JokeList extends Component {
  static defaultProps = {
    jokesLimit: 10
  };
  constructor(props) {
    super(props);
    this.state = {
      jokesArr: []
    };
  }
  async componentDidMount() {
    // load jokes
    // creating a new temp arr to hold the jokes before setting the state
    let jokes = [];
    while (jokes.length < this.props.jokesLimit) {
      let res = await axios.get("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" }
      });
      jokes.push({ id: uuid(), text: res.data.joke, votes: 0 });
    }
    this.setState({ jokesArr: jokes });
  }

  handleVote(id, delta) {
    this.setState(st => ({
      jokesArr: st.jokesArr.map(j =>
        j.id === id ? { ...j, votes: j.votes + delta } : j
      )
    }));
  }

  render() {
    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title">
            <span>Dad</span> Jokes
          </h1>
          <button className="JokeList-getMore">New Jokes</button>
        </div>

        <div className="JokeListContainer">
          {this.state.jokesArr.map(j => (
            <Joke
              key={j.id}
              votes={j.votes}
              text={j.text}
              upvote={() => this.handleVote(j.id, 1)}
              downvote={() => this.handleVote(j.id, -1)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default JokeList;
