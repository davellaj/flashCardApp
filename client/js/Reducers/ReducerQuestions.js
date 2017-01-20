import actions from '../Actions';

const ReducerQuestion = (state = {}, action) => {
  switch (action.type) {
    case 'GET_QUESTIONS': {
      console.log('ReducerQuestion getQuestions', action.payload)
      const word = action.payload[0];
      return {
        ...state,
        german: word.german,
        english: word.english,
        level: word.level,
        questionSet: word.questionSet,
        dictionary: action.payload,
        numberOfQuestions: action.payload.length
      }
    }
    case 'RIGHT_ANSWER': {
      // console.log('Action: RIGHT_ANSWER')
      let dictionaryRight = state.dictionary;
      const rightTemp = dictionaryRight.shift()
      // increment mValue
      dictionaryRight.push(rightTemp)
      console.log('dictionaryRight', dictionaryRight)
      return { ...state,
        dictionary: dictionaryRight,
        german: dictionaryRight[0].german,
        english: dictionaryRight[0].english
      }
    }
    case 'WRONG_ANSWER': {
      // console.log('Action: WRONG_ANSWER')
      let dictionaryWrong = state.dictionary;
      const wrongTemp = dictionaryWrong.shift()
      // decrement mValue
      dictionaryWrong.splice(2, 0, wrongTemp)
      console.log('dictionaryWrong',dictionaryWrong)
      return {
        ...state,
        dictionary: dictionaryWrong,
        german: dictionaryWrong[0].german,
        english: dictionaryWrong[0].english
      }
    }
    default:
      return state;
  }
}

export default ReducerQuestion;
