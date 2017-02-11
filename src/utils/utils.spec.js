import should from 'should' // eslint-disable-line no-unused-vars
import { parseTextAndBuildHashtags } from './index'

describe('utils: ', () => {

  it('parses text and creates hashtags and mentions', () => {

    const text = 'Look over there, #champ, that\'s how you do @react'
    const result = 'Look over there, <a href="https://twitter.com/hashtag/champ?src=hash" target="_blank">#champ</a>, that\'s how you do <a href="https://twitter.com/react" target="_blank">@react</a>'
    console.log(parseTextAndBuildHashtags(text))
    parseTextAndBuildHashtags(text).should.be.eql(result)

  })

})
