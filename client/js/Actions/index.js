import 'isomorphic-fetch'
import cookie from 'react-cookie'

/*******************************************
      Save User Question Set State
********************************************/
// export const SAVE_SESSION = 'SAVE_SESSION'
// export const saveSession = () => ({
//   type: SAVE_SESSION
// })

export const saveUserSession = (data) => dispatch => {
  console.log('Action: saveUserSession called')
  const url = 'api/saveSession'
  return fetch(url, {
    headers: {
      // 'Authorization': `Bearer ${cookie.load('accessToken')}`,
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(data )
  })
  .then(response => {
    if (!response.ok) {
      const error = new Error(response.statusText)
      error.response = response
      throw error
    }
    return response;
  })
  .then(response => console.log('saveUserSession: ', response.json()))
}


/*******************************************
     GET BASIC SET OF QUESTIONS
********************************************/
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const getQuestions = (data) => ({
  type: GET_QUESTIONS,
  payload: data
})

export const fetchQuestions = () => dispatch => {
  const url = '/api/dictionary'
  return fetch(url, {
    headers: {
      'Authorization': `Bearer ${cookie.load('accessToken')}`
    }
  })
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

/*******************************************
  GET SPECIFIC LEVEL-SET QUESTIONS
********************************************/

export const GET_QUESTION_SET = 'GET_QUESTION_SET'
export const getQuestionSet = (data) => ({
  type: GET_QUESTION_SET,
  payload: data
})

export const fetchQuestionSet = (userId, sessionComplete) => dispatch => {
  const url = `/api/questionSet/${userId}/${sessionComplete}`
  console.log('fetchQuestionSet url: ', url)
  return fetch(url, {
    headers: {
      'Authorization': `Bearer ${cookie.load('accessToken')}`
    }
  })
  .then(response => {
    if (!response.ok) {
      const error = new Error(response.statusText)
      error.response = response
      throw error
    }
    return response;
  })
  .then(response => response.json())
  // .then(data => console.log('fetchQuestionSet: ', data))
  .then(data => dispatch(getQuestionSet(data)))
  .catch(error => console.log(error))
}


/******************************
      GET - FETCH USER
*******************************/

export const GET_USER = 'GET_USER';
export const getUser = (data) => ({
  type: GET_USER,
  payload: data
})

// test userId: 587fafb3843ba0158d29ceef
export const fetchUser = () => dispatch => {
  console.log('dispatch fetchQuestions');

  const url = '/api/users'
  return fetch(url, {
    headers: {
      'Authorization': `Bearer ${cookie.load('accessToken')}`
    }
  })
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
  .then(data => dispatch(getUser(data)))
  .catch(error => console.log(error))
}

/*************************************
        RIGHT - WRONG ANSWER
**************************************/
export const WRONG_ANSWER = 'WRONG_ANSWER';
export const wrongAnswer = () => ({
  type: WRONG_ANSWER
})

export const RIGHT_ANSWER = 'RIGHT_ANSWER';
export const rightAnswer = () => ({
  type: RIGHT_ANSWER
})

export const TOGGLE_SESSION_COMPLETE = 'TOGGLE_SESSION_COMPLETE';
export const toggleSessionComplete = () => ({
  type: TOGGLE_SESSION_COMPLETE
})
