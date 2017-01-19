import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { fetchQuestions } from '../Actions'


class FlashCards extends Component {

  constructor(props) {
    super(props)
    // this.state = { term: '' }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
  }

  componentDidMount() {
    // console.log('Props: ', this.props)
    this.props.fetchQuestions('587fafb3843ba0158d29ceef');
  }


  onFormSubmit(event) {
    event.preventDefault();
    const { dictionary } = this.props.questions;
    console.log(`dictionary: ${dictionary}`);
    // let english = dictionary
    if (this.state.term === dictionary[0].english) {
      console.log('the same')
    } else {
      console.log('wrong')
    }
  }

  onInputChange(event) {
    this.setState({ term: event.target.value })
  }

  showQuestion() {
    console.log('showQuestion called');
    // console.log('this.props.questions: ', this.props.questions)
    const { dictionary } = this.props;
    // const german = this.props.questions.dictionary.map(item => {
    //   console.log('german: ', item.german)
    //   return item.german
    // })
    // const dictionary = this.props.questions.dictionary
    // console.log(`dictionary: ${dictionary}`)
    const question = dictionary;
    // console.log('question: ', question)
    // console.log('german: ', question.german)
    return <span> {question}</span>
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSummit}>
          <h3>Translate the word</h3>
          <div>
            <span>Ray: </span>
            {this.showQuestion()}
          </div>
          <div>
            <span>English: </span>
            <input
              type="text"
              placeholder="enter the English word"
              className="form-control"
            />
          </div>
          <button
            type="submit"
            className="btn btn-sm btn-outline-primary"
          >
            Submit
          </button>
        </form>

      </div>
    )
  }
}
// value={this.state.term}
// onChange={this.onInputChange}

const mapStateToProps = (state) => {
  console.log('state: ', state);
  return { dictionary: state.dictionary }
}

const mapDispatchToProps = (dispatch) => {
 return {
   fetchQuestions: userId => dispatch(fetchQuestions(userId))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlashCards);
