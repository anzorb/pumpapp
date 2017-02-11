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
import Swipeable from 'react-swipeable'
import './PhotoCarousel.scss'
import '../common.scss'
import animate from './animateUtil'

const SWIPE_THRESHOLD = 100

class PhotoCarousel extends Component {

  constructor(props) {

    super(props)

    this.changePage = this.changePage.bind(this)
    this.onSwiping = this.onSwiping.bind(this)
    this.onSwiped = this.onSwiped.bind(this)
    this.onSwipingLeft = this.onSwipingLeft.bind(this)
    this.onSwipingRight = this.onSwipingRight.bind(this)
    this.forward = this.forward.bind(this)
    this.back = this.back.bind(this)
    this.updateDimensions = this.updateDimensions.bind(this)
    this.handleWindowResize = this.handleWindowResize.bind(this)

    this.state = { page: 0 }

  }

  componentDidMount() {

    // we need to update dimensions if the window size or orientation change
    window.addEventListener('resize', this.handleWindowResize)
    window.addEventListener('orientationchange', this.handleWindowResize)
    this.updateDimensions()

  }

  handleWindowResize() {

    this.updateDimensions()
    this.forceUpdate()

  }

  componentDidUpdate(prevProps, prevState) {

    this.updateDimensions()

  }

  /* update dimensions and reset position of carousel */
  updateDimensions() {

    const { page } = this.state

    this.width = this.el.clientWidth
    const posX = -(this.width * page)

    if (this.carouselEl) {
      // hardware accelerated transforms for the carousel
      this.carouselEl.style[animate.format('transform')] = `translateX(${ posX }px)`
    }

  }

  /* While the finger/mouse is down and swiping */
  onSwiping(event, deltaX, deltaY, absX, absY) {

    const { page } = this.state

    // lock swiping/scrolling, so that they don't interrupt each other
    if (Math.abs(deltaX) > 10 && !this._scrolling) {
      this._swiping = true
    }

    if (Math.abs(deltaY) > 0 && !this._swiping) {
      this._scrolling = true
    }

    if (this._swiping && !this._scrolling) {

      event.preventDefault()

      // start position is calculated based on current page
      // @OPTIMIZE: this calculation doesn't need to happen on every swipe frame
      const xPosStart = this.width * page
      const posX = -(xPosStart + deltaX)

      // the moving class sets transition duration to zero so it follows the finger
      this.carouselEl.classList.add('photo-carousel__photos--moving')
      this.carouselEl.style[animate.format('transform')] = `translateX(${ posX }px)`
    }

  }

  /* Set a flag when swiping left */
  onSwipingLeft() {

    this._swipeDirection = 'left'

  }

  /* Set a flag when swiping right */
  onSwipingRight() {

    this._swipeDirection = 'right'

  }

  /* Figure out what to do when the finger releases the carousel */
  onSwiped(event, deltaX, deltaY) {

    // reset flags
    this._swiping = false
    this._scrolling = false

    const { page } = this.state

    this.carouselEl.classList.remove('photo-carousel__photos--moving')
    const absDeltaX = Math.abs(deltaX)

    // "bounce" the item back into place if swipe distance is below threshold
    if (absDeltaX < SWIPE_THRESHOLD) {
      this.carouselEl.style[animate.format('transform')] = `translateX(-${ page * this.width }px)`
    } else {

      if (this._swipeDirection === 'left') {
        this.forward()
      } else if (this._swipeDirection === 'right') {
        this.back()
      }

    }

  }

  /* Go back a page */
  back() {

    const { page } = this.state

    if (page - 1 >= 0) {

      const newPage = page - 1
      const posX = -(newPage * this.width)

      requestAnimationFrame(() => {
        this.carouselEl.style[animate.format('transform')] = `translateX(${ posX }px)`
      })

      this.setState({ page: newPage })

    } else {

      this.carouselEl.style[animate.format('transform')] = `translateX(-${ page * this.width }px)`

    }

  }

  /* Go forward a page */
  forward() {

    const { page } = this.state

    if (page + 1 < this.props.photos.length) {

      const newPage = page + 1
      const posX = -(newPage * this.width)

      requestAnimationFrame(() => {
        this.carouselEl.style[animate.format('transform')] = `translateX(${ posX }px)`
      })

      this.setState({ page: newPage })

    } else {

      this.carouselEl.style[animate.format('transform')] = `translateX(-${ page * this.width }px)`

    }

  }

  componentWillUnmount() {

    window.removeEventListener('resize', this.handleWindowResize)
    window.removeEventListener('orientationchange', this.handleWindowResize)

  }

  changePage(page) {

    const posX = -(page * this.width)

    this.setState({ page })
    this.carouselEl.style[animate.format('transform')] = `translateX(${posX}px)`

  }

  /* Render each photo */
  renderPhotos() {

    const styles = {
      width: this.width
    }

    return this.props.photos.map((photo, id) => {

      return (
        <div style={ styles } className="photo-carousel__photo" key={ id }>
          <img draggable="false" className="photo-carousel__photo__content" src={ photo.thumbnail } />
        </div>
      )

    })

  }

  /* Render click-able pages below the swipey */
  renderPages() {

    const { page } = this.state

    return this.props.photos.map((photo, id) => {

      const isActive = page === id ? 'active' : ''

      return (
        <div
        key={ id }
        className={ `photo-carousel__page ${isActive}` }
        onTouchTap={ () => this.changePage(id) }></div>
      )

    })

  }

  render() {

    let content

    const { isLoading, photos } = this.props

    // width = number of items in carousel, multiplied by width of each item
    const styles = {
      width: this.width ? this.width * photos.length : 0
    }

    if (isLoading) {

      content = <div className="flex-row flex-stretch flex-center">Loading feed</div>

    } else if (photos.length === 0) {

      content = <div className="flex-row flex-stretch flex-center">User has no photos</div>

    } else {

      content = (
        <Swipeable
          onSwiping={this.onSwiping}
          onSwiped={this.onSwiped}
          onSwipingLeft={this.onSwipingLeft}
          onSwipingRight={this.onSwipingRight}
          trackMouse={true}
          preventDefaultTouchmoveEvent={true}
          onTouchCancel={this.onSwiped}
          onDragStart={(e) => e.preventDefault()}
          className="photo-carousel__container flex-row flex-stretch">
          <div style={ styles } ref={ (el) => { this.carouselEl = el } } className="photo-carousel__photos">
            { photos && this.renderPhotos() }
          </div>
        </Swipeable>
      )

    }

    return (
      <div className="photo-carousel flex-column" ref={ (el) => { this.el = el } }>
        { content }
        <div className="photo-carousel__pagination flex-row flex-center">
          { photos && this.renderPages() }
        </div>
      </div>
    )

  }

}

PhotoCarousel.propTypes = {
  photos: React.PropTypes.array,
  isLoading: React.PropTypes.bool
}

export default PhotoCarousel