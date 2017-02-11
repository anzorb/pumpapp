import should from 'should' // eslint-disable-line no-unused-vars
import reducer from './popularFeed'
import {
  REQUEST_POPULAR_FEED_PHOTOS,
  RECEIVE_POPULAR_FEED_PHOTOS,
} from '../actions/popularFeedPhotos'

describe('reducer: popularFeed', () => {

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

  it('should should request popular photos', () => {

    const state = reducer(undefined, {
      type: REQUEST_POPULAR_FEED_PHOTOS
    })
    state.should.be.eql(requestState)

  })

  it('should should respond popular photos', () => {

    const state = reducer(undefined, {
      type: RECEIVE_POPULAR_FEED_PHOTOS,
      popularFeedPhotos: {
        result: {
          posts: [1, 2, 3]
        }
      }
    })
    state.should.be.eql(responseState)

  })

})