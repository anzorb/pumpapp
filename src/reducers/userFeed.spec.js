import should from 'should' // eslint-disable-line no-unused-vars
import reducer from './userFeed'
import {
  REQUEST_USER_FEED_PHOTOS,
  RECEIVE_USER_FEED_PHOTOS,
} from '../actions/userFeedPhotos'

describe('reducer: userFeed', () => {

  const initialState = {
    isLoading: true,
    photos: []
  }

  const requestState = {
    isLoading: true,
    photos: []
  }

  const responseState = {
    isLoading: false,
    photos: [1, 2, 3]
  }

  it('should return initial state', () => {

    const state = reducer(undefined, {})
    state.should.be.eql(initialState)

  })

  it('should should request user feed', () => {

    const state = reducer(undefined, {
      type: REQUEST_USER_FEED_PHOTOS
    })
    state.should.be.eql(requestState)

  })

  it('should should respond with user feed', () => {

    const state = reducer(undefined, {
      type: RECEIVE_USER_FEED_PHOTOS,
      userFeedPhotos: {
        result: {
          posts: [1, 2, 3]
        }
      }
    })
    state.should.be.eql(responseState)

  })

})