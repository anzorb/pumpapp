/* Copyright (c) 2017 Anzor Bashkhaz (https://github.com/anzorb)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import React, { Component } from 'react'
import './TruncatedText.scss'
import { truncateDOM } from '../../utils/'

class TruncatedText extends Component {

  constructor(props) {

    super(props)

    this.updateDimensions = this.updateDimensions.bind(this)
    this.readMore = this.readMore.bind(this)
    this.handleClick = this.handleClick.bind(this)

    this.state = {
      open: false
    }

    // back-up the full text - no need to store on state, if we don't render it using React
    this._text = props.text

  }

  componentDidMount() {

    window.addEventListener('resize', this.updateDimensions)

  }

  componentWillUnmount() {

    window.removeEventListener('resize', this.updateDimensions)

  }

  updateDimensions() {

    if (this.state.open) {
      return
    }

    this.paragraph.innerHTML = this._text

    if (this.paragraph.clientHeight > this.el.clientHeight) {
      truncateDOM(this.el, this.paragraph, '  ...read more')
      this.paragraph.innerHTML += '<span class="read-more-btn">   ...read more</span>'
    }

  }

  componentWillReceiveProps(nextProps) {

    this._text = nextProps.text
    this.updateDimensions()

  }

  readMore() {

    this.paragraph.innerHTML = this._text
    this.setState({ open: true })

  }

  handleClick(event) {

    // event delegation
    if (event.target.classList.contains('read-more-btn')) {
      this.readMore()
    }

  }

  render() {

    const { open } = this.state
    const { lines } = this.props

    const containerStyle = {
      height: open ? 'auto' : lines + 'em'
    }

    return (

      <div ref={(el) => { this.el = el} } style={ containerStyle }>
        <p
          className="truncated-text__content"
          onTouchTap={ this.handleClick }
          ref={ (el) => {this.paragraph = el} }>
        </p>
      </div>

    )
  }

}

TruncatedText.propTypes = {
  lines: React.PropTypes.number,
  text: React.PropTypes.string
}

export default TruncatedText