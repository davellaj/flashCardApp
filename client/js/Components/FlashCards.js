import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { fetchQuestions, fetchUser, rightAnswer, wrongAnswer } from '../Actions'

class FlashCards extends Component {

  constructor(props) {
    super(props)
    this.state = { term: '' }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchUser()
      .then(() => this.props.fetchQuestions())
      .then(() => {
        console.log('fetchQuestions data: ', this.props.questions)
        console.log('fetchUser data: ', this.props.user)
      });
  }

  onFormSubmit(event) {
    event.preventDefault();
    if (this.state.term === this.props.english) {
      this.props.rightAnswer();
      if (this.props.numberOfQuestions >= this.props.correctSessionAnswers) {
        console.log('Session Complete: ', this.props.numberOfQuestions)
      }
    } else {
      this.props.wrongAnswer();
    }
    this.setState({ term: '' });
  }

  onInputChange(event) {
    this.setState({ term: event.target.value })
  }

  render() {
    console.log('State Questions: ', this.props)
    return (
      <div>
        < Link to='/'>Home</Link>
        <form onSubmit={this.onFormSubmit}>
          <h3>Translate the word</h3>
          <div>
            <span>German: </span>
            {this.props.german}
          </div>
          <div>
            <span>English: </span>
            <input
              type="text"
              placeholder="enter the English word"
              className="form-control"
              value={this.state.term}
              onChange={this.onInputChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-sm btn-primary nextQuestion"
          >
            Submit
          </button>
          <button className="btn btn-sm btn-info saveSession">Save Session</button>
        </form>
        <div className="currentSession">
          <p className="sessionLevel">
            {this.props.numberOfQuestions} Questions - Level: {this.props.level} Set: {this.props.questionSet}
          </p>
          <p className="sessionScore">
            Session Score: <strong>{this.props.user.correctSessionAnswers}</strong>
          </p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    german: state.questions.german,
    english: state.questions.english,
    level: state.questions.level,
    questionSet: state.questions.questionSet,
    numberOfQuestions: state.questions.numberOfQuestions,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
 return {
   fetchQuestions: () => dispatch(fetchQuestions()),
   fetchUser: () => dispatch(fetchUser()),
   rightAnswer: () => dispatch(rightAnswer()),
   wrongAnswer: () => dispatch(wrongAnswer())
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlashCards);
