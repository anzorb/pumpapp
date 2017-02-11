const defaultState = {
  name: '',
  bio: '',
  profileThumbnail: '',
  userId: 2707798
}

export default function(state = defaultState, action) {

  switch (action.type) {

  case 'REQUEST_USER_INFO':
    return Object.assign({}, state, {
      isLoading: true,
      userId: action.userId
    })

  case 'RECEIVE_USER_INFO':
    return Object.assign({}, state, {
      isLoading: false
    }, action.userInfo)

  case 'SHOW_ERROR':
    return Object.assign({}, state, {
      isLoading: false,
      errorMessage: action.errorMessage
    })

  default:
    return state

  }

}