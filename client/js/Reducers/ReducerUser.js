import actions from '../Actions';

const InitialUserState = {
  correctSessionAnswers: 0
}

const ReducerUser = (state = {InitialUserState}, action) => {
  switch (action.type) {
    case 'GET_QUESTIONS': {
      console.log(`ReducerUser: ${action.payload}`)
      return {
        ...state,
        userName: action.payload.userName,
        userId: action.payload._id,
        accessToken: action.payload.accessToken
      }
    }
    case 'RIGHT_ANSWER': {
      const incrementCorrect = state.correctSessionAnswers + 1;
      return { ...state, correctSessionAnswers: incrementCorrect }
    }
    case 'WRONG_ANSWER': {
      const decrementCorrect = state.correctSessionAnswers - 1;
      return { ...state, correctSessionAnswers: decrementCorrect }
    }
    default:
      return state;
  }
}

export default ReducerUser;
