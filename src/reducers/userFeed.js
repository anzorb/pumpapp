const defaultState = {
  isLoading: true,
  photos: []
}

export default function userFeedPhotos(state = defaultState, action) {

  switch(action.type) {

  case 'REQUEST_USER_FEED_PHOTOS':
    return Object.assign({}, state, {
      isLoading: true
    })

  case 'RECEIVE_USER_FEED_PHOTOS':
    return Object.assign({}, state, {
      isLoading: false,
      photos: action.userFeedPhotos.result.posts
    })

  default:
    return state

  }

}