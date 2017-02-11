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
import { connect } from 'react-redux'
import { getUserFeedPhotos } from '../actions/userFeedPhotos'
import PhotoCarousel from '../components/PhotoCarousel/PhotoCarousel'
import { selectUserFeedPhotos } from '../selectors/userFeedPhotos'

class UserFeedPhotos extends Component {

  constructor(props) {

    super(props)

  }

  componentWillMount() {

    const { dispatch, userId } = this.props
    dispatch(getUserFeedPhotos(userId))

  }

  render() {

    const { photos, isLoading } = this.props

    return <PhotoCarousel photos={ photos } isLoading={ isLoading } />

  }

}

UserFeedPhotos.propTypes = {
  dispatch: React.PropTypes.func,
  userId: React.PropTypes.number,
  photos: React.PropTypes.array,
  isLoading: React.PropTypes.bool
}

function mapStateToProps(state) {

  return {
    photos: selectUserFeedPhotos(state),
    isLoading: state.userFeed.isLoading
  }

}

export default connect(mapStateToProps)(UserFeedPhotos)