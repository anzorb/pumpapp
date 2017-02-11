import { createSelector } from 'reselect'

const selectPhotos = state => state.popularFeed.photos

export const selectPopularFeedPhotos = createSelector(
  selectPhotos,
  photos => photos
)