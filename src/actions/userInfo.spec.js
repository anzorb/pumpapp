import should from 'should' // eslint-disable-line no-unused-vars
import sinon from 'sinon'
import * as apiMock from '../api/api.mock'
import { USER_INFO_MOCK } from '../api/api.mock'
import {
  getUserInfo,
  RECEIVE_USER_INFO,
  REQUEST_USER_INFO,
  __RewireAPI__ as actions
} from './userInfo'

describe('action: userInfo', () => {

  const userId = 318381

  beforeEach(() => {

    // Mock api requests
    actions.__Rewire__('api', apiMock)

  })

  it('should populate User Info', (done) => {

    const dispatch = sinon.spy()
    const fn = getUserInfo(userId)

    fn(dispatch)

    dispatch.called.should.be.eql(true)
    dispatch.calledWith({
      type: REQUEST_USER_INFO,
      userId
    }).should.be.eql(true)

    setTimeout(() => {

      dispatch.calledWith({
        type: RECEIVE_USER_INFO,
        userInfo: USER_INFO_MOCK
      }).should.be.eql(true)

      done()

    }, 0)

  })

})