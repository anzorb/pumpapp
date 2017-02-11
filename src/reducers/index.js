import { combineReducers } from 'redux'
import userInfo from './userInfo'
import userFeed from './userFeed'
import popularFeed from './popularFeed'

export default combineReducers({
  userInfo,
  userFeed,
  popularFeed
})