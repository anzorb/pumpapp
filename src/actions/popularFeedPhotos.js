import * as api from '../api/'
import { showError } from './common'

export const RECEIVE_POPULAR_FEED_PHOTOS = 'RECEIVE_POPULAR_FEED_PHOTOS'
export const REQUEST_POPULAR_FEED_PHOTOS = 'REQUEST_POPULAR_FEED_PHOTOS'

function receivePopularFeedPhotos(popularFeedPhotos) {

  return {
    type: RECEIVE_POPULAR_FEED_PHOTOS,
    popularFeedPhotos
  }

}

function requestPopularFeedPhotos() {

  return {
    type: REQUEST_POPULAR_FEED_PHOTOS
  }

}

export const getPopularFeedPhotos = limit => (dispatch) => {

  dispatch(requestPopularFeedPhotos())

  return api.fetchPopularFeedPhotos(limit)
    .then(popularFeedPhotos => dispatch(receivePopularFeedPhotos(popularFeedPhotos)))
    .catch(errorMessage => dispatch(showError('[getPopularFeedPhotos] ' + errorMessage)))

}