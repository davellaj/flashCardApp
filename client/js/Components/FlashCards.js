import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { getQuestions, getQuestion } from '../Actions'


class FlashCards extends Component {

  constructor(props) {
    super(props)
    this.state = { term: '' }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
  }


  onFormSubmit(event) {
    event.preventDefault();
    const { dictionary } = this.props.questions;
    console.log(dictionary);
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
    const { dictionary } = this.props.questions;
    return <span> {dictionary[0].german}</span>
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSummit}>
          <h3>Translate the word</h3>
          <div>
            <span>German: </span>
            {this.showQuestion()}
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

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log(state.questions);
  return { questions: state.questions }
}

export default connect(mapStateToProps, { getQuestions, getQuestion })(FlashCards);
