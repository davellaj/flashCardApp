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

export default (state = InitialState, action) => {
  switch (action.type) {
    case 'GET_QUESTIONS':
      // console.log(`GET_QUESTIONS: ${action.payload._id}`)
      // const userId = action.payload._id
      // const userName = action.payload.userName
      // const level = action.payload.level
      // const questionSet = action.payload.questionSet
      // const correctCount = action.payload.correctCount
      const dictionary = action.payload.dictionary
      // const words = action.payload.words
      console.log(`action: ${dictionary}`)
      return {
        ...state,
        // userId,
        // userName,
        // level,
        // questionSet,
        // correctCount,
        dictionary
        // words
      }

    default:
      return state;
  }
}
