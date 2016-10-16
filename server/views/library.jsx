const React = require('react');
// const BlueKit = require('react-bluekit').default;
// const componentsIndex = require('../../shared/js/componentsIndex.js');
const PatternLibrary = require('../../shared/js/internal/pattern-library.jsx');

// console.log('Output bluekit shiz....');
//console.log(BlueKit);
// console.log('Output components shiz....');
//console.log(componentsIndex);

//<BlueKit />


module.exports = class Library extends React.Component {
  render() {
    return (
      <html>
        <head>
          <title>React Pattern Library</title>
        </head>
        <body>
          <div id="content">
            <PatternLibrary />
          </div>
          <script src="/js/library.js"></script>
        </body>
      </html>
    );
  }
}

// return (
//
// );
//<BlueKit componentsIndex={componentsIndex} inline/>
