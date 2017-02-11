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

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1)

const vendors = [
  'Webkit',
  'Moz',
  'O',
  'ms'
]

const transitionEnd = {
  'WebkitTransition': 'webkitTransitionEnd',
  'MozTransition': 'transitionend',
  'OTransition': 'oTransitionEnd',
  'msTransition': 'MSTransitionEnd',
  'transition': 'transitionend'
}

class Animate {

  constructor() {

    // @TODO: unit test
    this._cache = {}
    // transitionend is special.
    this.transitionend = transitionEnd[this.format('transition', true)]

  }

  /**
   * Formats a CSS property with the appropriate
   * vendor prefix as required. Example:
   * transform >>> WebkitTransform
   * @param {string} propertyName the CSS property to format.
   * @param {Boolean} forceVendor
   * @return {string} The formatted (vendor-prefixed) property.
   */
  format(propertyName, forceVendor) {

    let testEl

    if (!this._cache[propertyName]) {
      testEl = document.createElement('div')

      // Check if the property exists as-is. We use
      // transform as a benchmark for all properties
      // since it is actually more reliable than some
      // specific properties (i.e. transition on iPad Mini 8.2)
      if (!forceVendor) {
        if (testEl.style.transform !== undefined) {
          return propertyName
        }
      }
      this._cache[propertyName] = testEl
    } else {
      testEl = this._cache[propertyName]
    }

    // Cycle through known vendors.
    for (let vendor in vendors) {

      if (vendors[vendor]) {
        // Combine vendor with capitalized propertyName.
        let vendorProp = vendors[vendor] + capitalizeFirstLetter(propertyName)

        // Check whether the vendor property exists.
        if (testEl.style[vendorProp] !== undefined) {
          return vendorProp
        }
      }

    }

    // Return the original propertyName.
    return propertyName

  }

}

// export as a singleton
export default new Animate()
