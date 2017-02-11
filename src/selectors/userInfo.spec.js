import should from 'should' // eslint-disable-line no-unused-vars
import { selectCurrentUserInfo } from './userInfo'

describe('selector: userInfo', () => {

  const state = {
    userInfo: {
      name: 'Anzor',
      profileThumbnail: 'img',
      bio: 'Follow me at @anzor_b Front-end developer'
    }
  }

  it('return expected state', () => {

    selectCurrentUserInfo(state).should.be.eql({
      name: 'Anzor',
      profileThumbnail: 'img',
      bio: 'Follow me at <a href="https://twitter.com/anzor_b" target="_blank">@anzor_b</a> Front-end developer'
    })

  })


})