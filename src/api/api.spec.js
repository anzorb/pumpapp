import should from 'should' // eslint-disable-line no-unused-vars
import sinon from 'sinon'
import {
  fetchUserInfo,
  fetchUserFeedPhotos,
  fetchPopularFeedPhotos,
  USER_INFO_URI,
  USER_FEED_PHOTOS_URI,
  POPULAR_FEED_PHOTOS_URI,
  DEFAULT_REQUEST_BODY,
  DEFAULT_OPTS,
  __RewireAPI__ as api
} from './index'

describe('api: ', () => {

  let fetchSpy

  beforeEach(() => {

    fetchSpy = sinon.spy(() => Promise.resolve())

    api.__Rewire__('fetch', fetchSpy)

  })

  afterEach(() => {

    api.__ResetDependency__('fetch')

    fetchSpy = undefined

  })

  it('fetchUserInfo', () => {

    const userId = 123

    fetchUserInfo(userId)

    const requestBody = Object.assign({}, DEFAULT_REQUEST_BODY, { userId })
    const request = Object.assign({
      body: JSON.stringify(requestBody)
    }, DEFAULT_OPTS)

    fetchSpy.calledWith(USER_INFO_URI(userId), request).should.be.eql(true)

  })

  it('fetchUserFeedPhotos', () => {

    const userId = 123

    fetchUserFeedPhotos(userId, 5)

    const requestBody = Object.assign({}, DEFAULT_REQUEST_BODY, {
      userId,
      isThumbnailsOnly: true,
      _method: 'POST',
      limit: 5
    })
    const request = Object.assign({
      body: JSON.stringify(requestBody)
    }, DEFAULT_OPTS)

    fetchSpy.calledWith(USER_FEED_PHOTOS_URI, request).should.be.eql(true)

  })

  it('fetchPopularFeedPhotos', () => {

    fetchPopularFeedPhotos(5)

    const requestBody = Object.assign({}, DEFAULT_REQUEST_BODY, {
      isThumbnailsOnly: true,
      _method: 'POST',
      limit: 5
    })

    const request = Object.assign({
      body: JSON.stringify(requestBody)
    }, DEFAULT_OPTS)

    fetchSpy.calledWith(POPULAR_FEED_PHOTOS_URI, request).should.be.eql(true)

  })

})
