import { createSelector } from 'reselect'

const getPhotos = state => state.userFeed.photos

// limit the number of photos displayed in the carousel to 4
export const selectUserFeedPhotos = createSelector(
  getPhotos,
  photos => photos ? photos.slice(0, 5) : []
)