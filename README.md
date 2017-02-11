#### Demos

- [iPhone Demo - for viewing on Desktop only](http://static.anzorb.com/device-viewer/index.html)
- [Responsive Demo - anywhere](http://static.anzorb.com/device-viewer/www/index.html)

#### Setup

```
  npm install
```


#### NPM tasks

```
  npm start - start dev server and listen for changes
  npm run build - build dev version into www/dist folder
  npm run dist - build dev & dist + minified versions into www/dist folder
  npm test - run mocha tests + dom tests
  npm test:dom - run DOM mocha tests in phantomjs
  npm test:node - run mocha tests in node.js
```

#### Notes

- The bio of the test account isn't long enough, so I used mine to show the '...read more' functionality.

- I had the option of bringing in a library for the photo carousel, but I thought it'd be fun to implement it myself.

#### Browser support

Chrome, Safari, FF (mobile + desktop)