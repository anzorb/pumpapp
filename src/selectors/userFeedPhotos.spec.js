import should from 'should' // eslint-disable-line no-unused-vars
import { selectUserFeedPhotos } from './userFeedPhotos'

describe('selector: userFeedPhotos', () => {

  const state = {
    userFeed: {
      photos: [1, 2, 3, 4, 5, 6]
    }
  }

  it('return expected state', () => {

    selectUserFeedPhotos(state).should.be.eql([1, 2, 3, 4, 5])

  })


})