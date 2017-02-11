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
import './UserInfo.scss'
import '../common.scss'
import TruncatedText from '../TruncatedText/TruncatedText'

const UserInfo = ({ user }) => {

  const profileImageStyle = {
    backgroundImage: `url(${ user.profileThumbnail })`
  }

  return (

    <div className="user-info flex-column">
      <div className="user-info__header flex-row">
        <div style={ profileImageStyle } className="user-info__avatar"></div>
        <div className="user-info__about flex-stretch flex-column">
          <div className="user-info__name">{ user.name }</div>
          <br/>
          <TruncatedText lines={ 3 } text={ user.bio } />
        </div>
      </div>
    </div>

  )
}

UserInfo.propTypes = {
  user: React.PropTypes.object
}

export default UserInfo