export const USER_INFO_MOCK = {
  name: 'anzor'
}

export const USER_PHOTOS_MOCK = [1, 2, 3]

export const POPULAR_FEED_PHOTOS_MOCK = [1, 2, 3, 4]

export function fetchUserInfo(userId) {
  return Promise.resolve(USER_INFO_MOCK)
}

export function fetchUserFeedPhotos(userId, limit) {
  return Promise.resolve(USER_PHOTOS_MOCK)
}

export function fetchPopularFeedPhotos(limit) {
  return Promise.resolve(POPULAR_FEED_PHOTOS_MOCK)
}