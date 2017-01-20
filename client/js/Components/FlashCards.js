import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { fetchQuestions, fetchQuestionSet, fetchUser, rightAnswer, wrongAnswer, toggleSessionComplete } from '../Actions'

class FlashCards extends Component {

  constructor(props) {
    super(props)
    this.state = { term: '' }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchUser()
      // .then(() => this.props.fetchQuestions())
      .then(() => this.props.fetchQuestionSet(this.props.user.userId, this.props.user.sessionComplete))
      // .then(() => {
      //   console.log('fetchQuestions data: ', this.props.questions)
      //   console.log('fetchUser data: ', this.props.user)
      // })
  }

  onFormSubmit(event) {
    event.preventDefault();
    if (this.state.term === this.props.english) {
      this.props.rightAnswer();
      console.log('numberOfQuestions: ', this.props.numberOfQuestions)
      console.log('correctSessionAnswers: ', this.props.user.correctSessionAnswers)
      if ((this.props.numberOfQuestions - 1) <= this.props.user.correctSessionAnswers) {
        this.props.toggleSessionComplete()
        this.props.fetchQuestionSet(this.props.user.userId, true)
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
    // console.log('State Questions: ', this.props)
    return (
      <div className="quizContainer container">
        < Link to='/'>Home</Link>
      <h3 className="quizContainerTitle">Translate the word</h3>
        <form onSubmit={this.onFormSubmit}>
          <div className="container wordContainer">

            <div className="row">

              <div className="col-xs-4 questionWordDiv">
                <p className="questionWordLabel">German: </p>
                <p className="questionWord">{this.props.german}</p>
              </div>
              <div className="col-xs-4 answerWord">
                <p>English: </p>
                <input
                  type="text"
                  placeholder="enter the English word"
                  className="form-control translationInput"
                  value={this.state.term}
                  onChange={this.onInputChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-sm btn-primary nextQuestion"
            >
              Submit
            </button>
            <button className="btn btn-sm btn-info saveSession">Save Session</button>
          </div>

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
   fetchQuestionSet: (userId, sessionComplete) => dispatch(fetchQuestionSet(userId, sessionComplete)),
   fetchUser: () => dispatch(fetchUser()),
   rightAnswer: () => dispatch(rightAnswer()),
   wrongAnswer: () => dispatch(wrongAnswer()),
   toggleSessionComplete: () => dispatch(toggleSessionComplete())
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlashCards);
