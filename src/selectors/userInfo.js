import { createSelector } from 'reselect'
import { parseTextAndBuildHashtags } from '../utils/'

const selectUserInfo = state => state.userInfo

// make sure we parse the bio ONLY when it changes
export const selectCurrentUserInfo = createSelector(
  selectUserInfo,
  userInfo => {
    const { bio } = userInfo
    const parsedBio = parseTextAndBuildHashtags(bio)
    return Object.assign({}, userInfo, { bio: parsedBio })
  }
)