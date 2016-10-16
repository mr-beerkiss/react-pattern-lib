// const BlueKit = require('react-bluekit').default;
// const componentsIndex = require('../../shared/js/componentsIndex.js');
const PatternLibrary = require('./internal/pattern-library.jsx');

const ReactDOM = require('react-dom');
const React = require('react');

(function() {
  const container = document.querySelector('#content');

  ReactDOM.render(
    // <BlueKit componentsIndex={componentsIndex} inline/>,
    <PatternLibrary />,
    container
  );

})();
