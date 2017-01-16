import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import * as reducers from './Reducers'

export default createStore(reducers.rootReducer, applyMiddleware(thunk))
