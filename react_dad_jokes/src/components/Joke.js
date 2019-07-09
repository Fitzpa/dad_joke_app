import React, { Component } from "react";
import "../styles/Joke.css";

class Joke extends Component {
  getColor() {
    if (this.props.votes >= 15) {
      return "#b6bcc9";
    } else if (this.props.votes >= 12) {
      return "#99a1b3";
    } else if (this.props.votes >= 9) {
      return "#7c869e";
    } else if (this.props.votes >= 6) {
      return "#6d7993";
    } else if (this.props.votes >= 3) {
      return "#626d84";
    } else if (this.props.votes >= 0) {
      return "#4c5567";
    } else {
      return "#373d4a";
    }
  }
  getEmoji() {
    if (this.props.votes >= 15) {
      return "far fa-grin-squint-tears fa-4x";
    } else if (this.props.votes >= 12) {
      return "far fa-laugh-beam fa-4x";
    } else if (this.props.votes >= 9) {
      return "far fa-grin-beam fa-4x";
    } else if (this.props.votes >= 6) {
      return "far fa-smile fa-4x";
    } else if (this.props.votes >= 3) {
      return "far fa-meh fa-4x";
    } else if (this.props.votes >= 0) {
      return "far fa-frown fa-4x";
    } else {
      return "far fa-angry fa-4x";
    }
  }

  render() {
    return (
      <div className="Joke">
        <div className="Joke-buttons">
          <i className="fas fa-arrow-up" onClick={this.props.upvote} />
          <span className="Joke-votes" style={{ borderColor: this.getColor() }}>
            {this.props.votes}
          </span>
          <i className="fas fa-arrow-down" onClick={this.props.downvote} />
        </div>
        <div className="Joke-text">{this.props.text}</div>
        <div className="Joke-emoji">
          <i className={this.getEmoji()} />
        </div>
      </div>
    );
  }
}

export default Joke;
