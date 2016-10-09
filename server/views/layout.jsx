
const React = require('react');


module.exports = class Layout extends React.Component {
  render() {
    return (
      <html lang="en">
        <head>
          <title>{this.props.title}</title>
          <link rel="stylesheet" href="/css/site.css" />
        </head>
        <body>
          {this.props.children}
          <script src="/js/list.js"></script>
        </body>
      </html>
    );
  }
}
