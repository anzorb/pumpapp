var testsContext = require.context('../src/', true, /.*spec.dom.js$/);
testsContext.keys().forEach(testsContext);