import { combineReducers } from 'redux'
// import { reducer as formReducer } from 'redux-form'
import ReducerQuestions from './ReducerQuestions'
import ReducerUser from './ReducerUser'

const rootReducer = combineReducers({
  questions: ReducerQuestions,
  user: ReducerUser
})

export default rootReducer
