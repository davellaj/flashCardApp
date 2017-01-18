import actions from '../Actions';

const InitialState = {
  answerInput: '',
  words: [
    { '587e73f4c82096dcc9a68d1a': 3 },
    { '587e73fdc82096dcc9a68d1b': 1 },
    { '587f0908e8427f0002a55401': 1 }
  ],
  activeQuestion: {},
  questionNumber: 0,
  user: {
    userName: 'Jamie',
    correctCount: 0,
    level: 1,
    questionSet: 3,
  },
  dictionary: [
    {
        id: '587e73f4c82096dcc9a68d1a',
        german: 'katze',
        english: 'cat',
        level: 1,
        questionSet: 1
    },
    {
        id: '587e73fdc82096dcc9a68d1b',
        german: 'hund',
        english: 'dog',
        level: 1,
        questionSet: 1
    },
    {
        id: '587f0908e8427f0002a55401',
        german: 'bier',
        english: 'beer',
        level: 1,
        questionSet: 1
    }
  ]
}

export default (state = InitialState, action) => {
  switch (action.type) {
    case 'GET_QUESTIONS':
      console.log('GET_QUESTIONS Action called')
      return state;

    case 'GET_QUESTION': {
      let activeWord = state.dicitionary[state.questionNumber];

      console.log(activeWord)
      return state;
    }

    default:
      return state;
  }
}
