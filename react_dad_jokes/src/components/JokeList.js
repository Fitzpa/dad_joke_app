import React, { Component } from "react";
import Joke from "./Joke";
import axios from "axios";
import uuid from "uuid/v4";
import "../styles/JokeList.css";

class JokeList extends Component {
  static defaultProps = {
    jokesLimit: 10,
  };
  constructor(props) {
    super(props);
    this.state = {
      jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
    };
    this.seenJokes = new Set(this.state.jokes.map(j => j.text));
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    if (this.state.jokes.length === 0) {
      this.getJokes();
    }
  }

  async getJokes() {
    try {
      // load jokes
      // creating a new temp arr to hold the jokes before setting the state
      let jokes = [];
      while (jokes.length < this.props.jokesLimit) {
        let res = await axios.get("https://icanhazdadjoke.com/", {
          headers: { Accept: "application/json" },
        });
        let newJoke = res.data.joke;
        if (!this.seenJokes.has(newJoke)) {
          jokes.push({ id: uuid(), text: newJoke, votes: 0 });
        } else {
          console.log("FOUND A DUPLICATE JOKE");
          console.log(newJoke);
        }
      }
      this.setState(
        st => ({
          loading: false,
          jokes: [...st.jokes, ...jokes],
        }),
        () => {
          window.localStorage.setItem(
            "jokes",
            JSON.stringify(this.state.jokes)
          );
        }
      );
    } catch (err) {
      alert(err);
      this.setState({ loading: false });
    }
  }

  handleVote(id, delta) {
    this.setState(
      st => ({
        jokes: st.jokes.map(j =>
          j.id === id ? { ...j, votes: j.votes + delta } : j
        ),
      }),
      () => {
        window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes));
      }
    );
  }

  handleClick() {
    this.setState({ loading: true }, this.getJokes);
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="JokeList-spinner">
          <i className="far fa-8x fa-laugh fa-spin" />
          <h1 className="JokeList-title">Loading...</h1>
        </div>
      );
    }
    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title">
            <span>Dad</span> Jokes
          </h1>
          <button className="JokeList-getMore" onClick={this.handleClick}>
            New Jokes
          </button>
        </div>

        <div className="JokeListContainer">
          {this.state.jokes.map(j => (
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
