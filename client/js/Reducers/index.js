import * as actions from '../Actions'

const initialState = {

  vocab: [
    {
      id: 1,
      native: "beer",
      translation: "bier",
      correct: false
    },
    {
      id: 2,
      native: "please",
      translation: "bitte",
      correct: false
    },
    {
      id: 3,
      native: "cheers",
      translation: "prost",
      correct: false
    },
    {
      id: 4,
      native: "one",
      translation: "ein",
      correct: false
    }
  ]
}
export const rootReducer = (state={}, action) => {
  return state;
}
