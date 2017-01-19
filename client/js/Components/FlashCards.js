import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { fetchQuestions, rightAnswer, wrongAnswer } from '../Actions'

class FlashCards extends Component {

  constructor(props) {
    super(props)
    this.state = { term: '' }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchQuestions(this.props.user.userId);
  }

  onFormSubmit(event) {
    event.preventDefault();
    if (this.state.term === this.props.english) {
      this.props.rightAnswer();
    } else {
      this.props.wrongAnswer();
    }
    this.setState({ term: '' });
  }

  onInputChange(event) {
    this.setState({ term: event.target.value })
  }

  render() {
    return (
      <div>
        < Link to='question'>Question</Link>
        <form onSubmit={this.onFormSubmit}>
          <h3>Translate the word</h3>
          <div>
            <span>Ray: </span>
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
            className="btn btn-sm btn-outline-primary"
          >
            Submit
          </button>
        </form>
        <div>
          <p>Session Score: <strong>{this.props.user.correctSessionAnswers}</strong></p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    german: state.questions.german,
    english: state.questions.english,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
 return {
   fetchQuestions: userId => dispatch(fetchQuestions(userId)),
   rightAnswer: () => dispatch(rightAnswer()),
   wrongAnswer: () => dispatch(wrongAnswer())
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlashCards);
