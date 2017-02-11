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
import { getPopularFeedPhotos } from '../actions/popularFeedPhotos'
import PhotoGrid from '../components/PhotoGrid/PhotoGrid'
import { selectPopularFeedPhotos } from '../selectors/popularFeedPhotos'

class PopularFeedPhotos extends Component {

  constructor(props) {

    super(props)

  }

  componentWillMount() {

    const { dispatch } = this.props
    dispatch(getPopularFeedPhotos(21))

  }

  render() {

    const { photos, isLoading } = this.props

    return <PhotoGrid photos={ photos } isLoading={ isLoading } />

  }

}

PopularFeedPhotos.propTypes = {
  dispatch: React.PropTypes.func,
  photos: React.PropTypes.array,
  isLoading: React.PropTypes.bool
}

function mapStateToProps(state) {

  return {
    photos: selectPopularFeedPhotos(state),
    isLoading: state.popularFeed.isLoading
  }

}

export default connect(mapStateToProps)(PopularFeedPhotos)