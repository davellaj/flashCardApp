import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { fetchQuestions,
        fetchQuestionSet,
        fetchUser,
        rightAnswer,
        saveUserSession,
        toggleSessionComplete,
        wrongAnswer
      } from '../Actions'

class FlashCards extends Component {

  constructor(props) {
    super(props)
    this.state = { term: '' }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.onSaveSession = this.onSaveSession.bind(this)
  }

  componentDidMount() {
    this.props.fetchUser()
      .then(() => this.props.fetchQuestionSet(this.props.user.userId, this.props.user.sessionComplete))
  }

  onFormSubmit(event) {
    event.preventDefault();
    if (this.state.term === this.props.english) {
      this.props.rightAnswer();
      if ((this.props.numberOfQuestions - 1) <= this.props.user.correctSessionAnswers) {
        this.props.toggleSessionComplete()
        this.props.fetchQuestionSet(this.props.user.userId, true)
      }
    } else {
      this.props.wrongAnswer();
    }
    this.setState({ term: '' });
  }

  onSaveSession(event) {
    event.preventDefault();
    // console.log('onSaveSession button clicked', this.props.dictionary)
    this.props.saveUserSession({ dictionary: this.props.dictionary, userId: this.props.user.userId });
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
        <div>
          <button type='submit' onClick={this.onSaveSession}>
            Test Save Session
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('state: ', state)
  return {
    german: state.questions.german,
    english: state.questions.english,
    level: state.questions.level,
    questionSet: state.questions.questionSet,
    numberOfQuestions: state.questions.numberOfQuestions,
    dictionary: state.questions.dictionary,
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
   saveUserSession: (dictionary) => dispatch(saveUserSession(dictionary)),
   toggleSessionComplete: () => dispatch(toggleSessionComplete())
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlashCards);
