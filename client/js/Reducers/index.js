import { combineReducers } from 'redux'
// import { reducer as formReducer } from 'redux-form'
import ReducerQuestions from './ReducerQuestions'

const rootReducer = combineReducers({
  dictionary: ReducerQuestions,
})

export default rootReducer
