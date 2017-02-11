import should from 'should' // eslint-disable-line no-unused-vars
import sinon from 'sinon'
import * as apiMock from '../api/api.mock'
import { USER_PHOTOS_MOCK } from '../api/api.mock'
import {
  getUserFeedPhotos,
  RECEIVE_USER_FEED_PHOTOS,
  REQUEST_USER_FEED_PHOTOS,
  __RewireAPI__ as actions
} from './userFeedPhotos'

describe('action: userFeedPhotos', () => {

  const userId = 318381

  beforeEach(() => {

    // Mock api requests
    actions.__Rewire__('api', apiMock)

  })

  it('should populate User Photos', (done) => {

    const dispatch = sinon.spy()

    const fn = getUserFeedPhotos(userId, 5)

    fn(dispatch)

    dispatch.calledWith({
      type: REQUEST_USER_FEED_PHOTOS,
      userId
    }).should.be.eql(true)

    setTimeout(() => {

      dispatch.calledWith({
        type: RECEIVE_USER_FEED_PHOTOS,
        userFeedPhotos: USER_PHOTOS_MOCK
      }).should.be.eql(true)

      done()

    }, 0)

  })

})