/**
 * Basic hashtag and mentions builder from text
 * @param {String} text original text to parse
 * @return {String} parsedText parsed text with links
 */
export function parseTextAndBuildHashtags(text) {

  if (!text) {
    return ''
  }

  let parsedText

  // replace hashtags and mentions
  parsedText = text
    .replace(/#(\w+)/g, '<a href="https://twitter.com/hashtag/$1?src=hash" target="_blank">#$1</a>')
    .replace(/@(\w+)/g, '<a href="https://twitter.com/$1" target="_blank">@$1</a>')

  return parsedText

}

/**
 * Truncate DOM element to parent's height, word by word
 * @param {Element} parent parent DOM element
 * @param {Element} child child DOM element
 * @param {String} readMoreText "read more.." text to account for
 */
export function truncateDOM(parent, child, readMoreText) {

  // until the height of the paragraph isn't larger than the height of the container
  while (child.clientHeight > parent.clientHeight) {
    // remove words from the back, word by word
    let text = child.innerHTML
    text = text.replace(/\W*\s(\S)*$/, '')
    child.innerHTML = text
  }

  if (!readMoreText) {
    return
  }

  const length = readMoreText.length
  let cur = 0

  // let's remove more words, until we get to a point where we can fit '   ...read more'
  while (cur < length) {
    let text = child.innerHTML
    const match = text.match(/\W*\s(\S)*$/)
    cur += match[0].length
    text = text.replace(/\W*\s(\S)*$/, '')
    child.innerHTML = text
  }

}
