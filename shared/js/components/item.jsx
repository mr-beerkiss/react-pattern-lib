const React = require('react');

module.exports = class Item extends React.Component {
  render() {
    return(
      <li>
        <span className="item">{this.props.content}</span>
        <span className="remove" onClick={this.props.remove}>x</span>
      </li>
    );
  }
}
