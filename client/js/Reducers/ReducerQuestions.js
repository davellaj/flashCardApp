import actions from '../Actions';

const InitialState = {
  answerInput: '',
  activeQuestion: {},
  questionNumber: 0,
  userid: '',
  userName: '',
  correctCount: 0,
  questionSet: 1,
  level: 1,
  dictionary: [],
  words: []
}

export default (state = [], action) => {
  switch (action.type) {
    case 'GET_QUESTIONS':
      // const { data } = action.payload
      // console.log('action: ', action.payload)
      return {
        ...state, state: action.payload
      }

    case 'GET_USER':

      return { ...state }
    default:
      return state;
  }
}
