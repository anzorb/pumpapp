import should from 'should' // eslint-disable-line no-unused-vars
import reducer from './userInfo'
import {
  RECEIVE_USER_INFO,
  REQUEST_USER_INFO,
} from '../actions/userInfo'

describe('reducer: userInfo', () => {

  const initialState = {
    name: '',
    bio: '',
    profileThumbnail: '',
    userId: 2707798
  }

  const requestState = {
    name: '',
    bio: '',
    profileThumbnail: '',
    userId: 2707798,
    isLoading: true
  }

  const responseState = {
    name: 'anzor',
    bio: '',
    profileThumbnail: '',
    userId: 2707798,
    isLoading: false
  }

  it('should return initial state', () => {

    reducer(undefined, {}).should.be.eql(initialState)

  })

  it('should should request user info', () => {

    const state = reducer(undefined, {
      type: REQUEST_USER_INFO,
      userId: 2707798
    })
    state.should.be.eql(requestState)

  })

  it('should should respond with user info', () => {

    const state = reducer(undefined, {
      type: RECEIVE_USER_INFO,
      userInfo: {
        name: 'anzor',
        bio: '',
        profileThumbnail: ''
      }
    })
    state.should.be.eql(responseState)

  })

})