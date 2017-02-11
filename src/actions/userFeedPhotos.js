import * as api from '../api/'
import { showError } from './common'

export const REQUEST_USER_FEED_PHOTOS = 'REQUEST_USER_FEED_PHOTOS'
export const RECEIVE_USER_FEED_PHOTOS = 'RECEIVE_USER_FEED_PHOTOS'

function receiveUserFeedPhotos(userFeedPhotos) {

  return {
    type: RECEIVE_USER_FEED_PHOTOS,
    userFeedPhotos
  }

}

function requestUserFeedPhotos(userId) {

  return {
    type: REQUEST_USER_FEED_PHOTOS,
    userId
  }

}

export const getUserFeedPhotos = (userId, limit) => (dispatch) => {

  dispatch(requestUserFeedPhotos(userId))

  return api.fetchUserFeedPhotos(userId, limit)
    .then(userFeedPhotos => dispatch(receiveUserFeedPhotos(userFeedPhotos)))
    .catch(errorMessage => dispatch(showError('[getUserFeedPhotos] ' + errorMessage)))

}