import 'isomorphic-fetch'

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const getQuestions = (data) => ({
  type: GET_QUESTIONS,
  payload: data
})

// test userId: 587fafb3843ba0158d29ceef
export const fetchQuestions = userId => dispatch => {
  console.log('dispatch fetchQuestions');
  const url = `/flashCards/${userId}`
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
  // .then(data => console.log('fetch: ', data.dictionary))
  .then(data => dispatch(getQuestions(data)))
  .catch(error => console.log(error))
}

export const GET_QUESTION = 'GET_QUESTION';
export const getQuestion = () => ({
  type: GET_QUESTION
})

export const UPDATE_MEMORY = 'UPDATE_MEMORY';
export const updateMemory = (index) => ({
  type: updateMemory,
  data: index
})
