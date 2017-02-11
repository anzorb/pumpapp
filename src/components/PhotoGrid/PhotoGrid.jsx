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

import React from 'react'
import './PhotoGrid.scss'
import '../common.scss'

const PhotoGrid = ({ photos, isLoading }) => {

  function renderPhotos() {

    if (isLoading) {
      return <p className="flex-stretch flex-row flex-center">Loading photos</p>
    }

    if (!photos) {
      return <p className="flex-stretch flex-row flex-center">User has no photos</p>
    }

    return photos.map((photo, id) => {
      const style = {
        backgroundImage: `url(${ photo.thumbnail })`
      }
      return <div className="camera-roll__photo" style={ style } key={ id } />
    })

  }

  return (

    <div className="camera-roll flex-row flex-wrap">
      { renderPhotos() }
    </div>

  )

}

PhotoGrid.propTypes = {
  photos: React.PropTypes.array,
  isLoading: React.PropTypes.bool
}

export default PhotoGrid