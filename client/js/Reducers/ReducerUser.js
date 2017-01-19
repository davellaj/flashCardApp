import actions from '../Actions';

const InitialUserState = {
  userId: '587fafb3843ba0158d29ceef',
  userName: 'Ray Smith',
  correctSessionAnswers: 0
}

const ReducerUser = (state = InitialUserState, action) => {
  switch (action.type) {
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
