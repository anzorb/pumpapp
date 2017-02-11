const defaultState = {
  isLoading: true,
  photos: []
}

export default function popularFeedPhotos(state = defaultState, action) {

  switch(action.type) {

  case 'REQUEST_POPULAR_FEED_PHOTOS':
    return Object.assign({}, state, {
      isLoading: true
    })

  case 'RECEIVE_POPULAR_FEED_PHOTOS':
    return Object.assign({}, state, {
      isLoading: false,
      photos: action.popularFeedPhotos.result.posts
    })

  default:
    return state

  }

}