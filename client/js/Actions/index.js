import 'isomorphic-fetch'

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const getQuestions = (data) => ({
  type: GET_QUESTIONS,
  payload: data
})

// test userId: 587fafb3843ba0158d29ceef
export const fetchQuestions = userId => dispatch => {
  console.log('dispatch fetchQuestions');
  const url = '/dictionary'
  return fetch(url)
  .then(response => {
    if (!response.ok) {
      const error = new Error(response.statusText)
      error.response = response
      throw error
    }
    return response;
  })
  .then(response => response.json())
  // .then(data => console.log('fetch: ', data))
  .then(data => dispatch(getQuestions(data)))
  .catch(error => console.log(error))
}

export const WRONG_ANSWER = 'WRONG_ANSWER';
export const wrongAnswer = () => ({
  type: WRONG_ANSWER
})

export const RIGHT_ANSWER = 'RIGHT_ANSWER';
export const rightAnswer = () => ({
  type: RIGHT_ANSWER
})
