import { truncateDOM } from './index'
import truncateDOMFixture from '../../tests/fixtures/truncate-dom.html'

describe('dom-utils: ', () => {

  it('truncates a paragraph until it does not exceed parent\'s height', (done) => {

    const document = window.document
    const main = document.getElementById('mocha')
    main.innerHTML = truncateDOMFixture
    const parent = window.document.querySelector('#parent')
    const child = window.document.querySelector('#child')

    truncateDOM(parent, child)

    // the result string was determined by opening index.html in Chrome
    should(child.textContent).be.eql('It is a long established fact that a reader will be distracted by the readable content of a page when')

    done()

  })

})
