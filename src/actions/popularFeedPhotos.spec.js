import should from 'should' // eslint-disable-line no-unused-vars
import sinon from 'sinon'
import * as apiMock from '../api/api.mock'
import { POPULAR_FEED_PHOTOS_MOCK } from '../api/api.mock'
import {
  getPopularFeedPhotos,
  RECEIVE_POPULAR_FEED_PHOTOS,
  REQUEST_POPULAR_FEED_PHOTOS,
  __RewireAPI__ as actions
} from './popularFeedPhotos'

describe('action: popularFeedPhotos', () => {

  beforeEach(() => {

    // Mock api requests
    actions.__Rewire__('api', apiMock)

  })

  it('should populate Popular Feed Photos', (done) => {

    const dispatch = sinon.spy()
    const fn = getPopularFeedPhotos(20)

    fn(dispatch)

    dispatch.calledWith({
      type: REQUEST_POPULAR_FEED_PHOTOS
    }).should.be.eql(true)

    setTimeout(() => {

      dispatch.calledWith({
        type: RECEIVE_POPULAR_FEED_PHOTOS,
        popularFeedPhotos: POPULAR_FEED_PHOTOS_MOCK
      }).should.be.eql(true)

      done()

    }, 0)

  })

})