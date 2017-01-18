import 'isomorphic-fetch'

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const getQuestions = (data) => ({
  type: GET_QUESTIONS,
  payload: data
})

export const GET_QUESTION = 'GET_QUESTION';
export const getQuestion = () => ({
  type: GET_QUESTION
})

export const UPDATE_MEMORY = 'UPDATE_MEMORY';
export const updateMemory = (index) => ({
  type: updateMemory,
  data: index
})
