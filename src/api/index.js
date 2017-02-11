const fetch = typeof window === 'undefined' ? fetch : window.fetch

function buildRequestBody(reqBody = {}) {

  const body = Object.assign({}, DEFAULT_REQUEST_BODY, reqBody)

  return Object.assign({ body: JSON.stringify(body) }, DEFAULT_OPTS)
}

const fakeBio = 'Follow me at @anzor_b Front-end #developer who enjoys the ever-changing scene of Web and HTML5 development. HTML5 and Web Development is both a hobby and a career. Many years of experience with JavaScript and Web Frameworks/Libraries. Early adopter/promoter/educator of ES2015/ES6, Angular, React, Web Components, NodeJS. Strong believer in well structured, modular (non-global!), tested code.'

export const DEFAULT_REQUEST_BODY = {
  '_method': 'GET',
  '_version': '4.7.0',
  '_SessionToken': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjI3MDc3OTgsImV4cCI6MTUzOTUzNTI1OTM2OH0.UK2qP1yk9QLk_Bkx1Ly0RPaitRYtec8ojZhzYRc0D-g'
}

export const DEFAULT_OPTS = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}

export const USER_INFO_URI = (userId) => `http://api.pumpup.com/1/classes/User/${userId}`
export const USER_FEED_PHOTOS_URI = 'http://api.pumpup.com/1/functions/feed/profile/load-batch'
export const POPULAR_FEED_PHOTOS_URI = 'http://api.pumpup.com/1/functions/feed/popular/load-batch'

export function fetchUserInfo(userId) {

  const opts = buildRequestBody({ userId })

  return fetch(USER_INFO_URI(userId), opts)
    .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    .then(data => {
      const newData = Object.assign({}, data, { bio: fakeBio })
      return Promise.resolve(newData)
    })

}

export function fetchUserFeedPhotos(userId, limit = 5) {

  const opts = buildRequestBody({
    userId: userId,
    isThumbnailsOnly: true,
    _method: 'POST',
    limit
  })

  return fetch(USER_FEED_PHOTOS_URI, opts)
    .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    .then(data => Promise.resolve(data))

}

export function fetchPopularFeedPhotos(limit = 10) {

  const opts = buildRequestBody({
    isThumbnailsOnly: true,
    _method: 'POST',
    limit
  })

  return fetch(POPULAR_FEED_PHOTOS_URI, opts)
    .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    .then(data => Promise.resolve(data))

}