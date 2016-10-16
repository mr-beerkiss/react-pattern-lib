const BlueKit = require('react-bluekit').default;
const componentsIndex = require('../componentsIndex.js');
const React = require('react');

module.exports = class PatternLibrary extends React.Component {
  render() {
    return (
      <BlueKit componentsIndex={componentsIndex} inline/>
    );
  }
}
