import actions from '../Actions';

const ReducerQuestion = (state = { dictionary: {} }, action) => {
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

    case 'GET_QUESTION_SET': {
      // console.log('ReducerQuestion getQuestionSet', action.payload)
      const word = action.payload[0];
      console.log('GetQuestion: ', word.german, ' ', word.level);
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
      // console.log('dictionaryRight', dictionaryRight[0].questionSet)
      return { ...state,
        dictionary: dictionaryRight,
        german: dictionaryRight[0].german,
        english: dictionaryRight[0].english,
        level: dictionaryRight[0].level,
        questionSet: dictionaryRight[0].questionSet
      }
    }
    
    case 'WRONG_ANSWER': {
      // console.log('Action: WRONG_ANSWER')
      let dictionaryWrong = state.dictionary;
      const wrongTemp = dictionaryWrong.shift()
      // decrement mValue
      dictionaryWrong.splice(2, 0, wrongTemp)
      // console.log('dictionaryWrong', dictionaryWrong[0].questionSet)
      return {
        ...state,
        dictionary: dictionaryWrong,
        german: dictionaryWrong[0].german,
        english: dictionaryWrong[0].english,
        level: dictionaryWrong[0].level,
        questionSet: dictionaryWrong[0].questionSet
      }
    }
    default:
      return state;
  }
}

export default ReducerQuestion;
