import * as api from '../api/'
import { showError } from './common'

export const REQUEST_USER_INFO = 'REQUEST_USER_INFO'
export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO'

function requestUserInfo(userId) {

  return {
    type: REQUEST_USER_INFO,
    userId
  }

}

function receiveUserInfo(userInfo) {

  return {
    type: RECEIVE_USER_INFO,
    userInfo: userInfo
  }

}

export const getUserInfo = userId => (dispatch) => {

  dispatch(requestUserInfo(userId))

  return api.fetchUserInfo(userId)
    .then(userInfo => dispatch(receiveUserInfo(userInfo)))
    .catch(errorMessage => dispatch(showError(errorMessage)))

}