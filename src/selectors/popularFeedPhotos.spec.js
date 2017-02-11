import should from 'should' // eslint-disable-line no-unused-vars
import { selectPopularFeedPhotos } from './popularFeedPhotos'

describe('selector: popularFeedPhotos', () => {

  const state = {
    popularFeed: {
      photos: [1, 2, 3]
    }
  }

  it('return expected state', () => {

    selectPopularFeedPhotos(state).should.be.eql([1, 2, 3])

  })


})