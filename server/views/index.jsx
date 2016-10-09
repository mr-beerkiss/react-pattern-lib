'use strict';

const Content = require('../../shared/js/components/content');
const escapeHtml = require('escape-html');
const Layout = require('./layout');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

module.exports = class Index extends React.Component {
  render() {
    const dataScript = `window.__list__ = '${escapeHtml(JSON.stringify(this.props.list))}';`;

    console.log(`Data Script: ${dataScript}`);

    // render as a dynamic react component
    //var contentString = ReactDOMServer.renderToString(<Content list={this.props.list} />);

    return (
      <Layout title={this.props.title}>
        <h1>{this.props.title}</h1>

        <div id="content">
          <Content list={this.props.list} />
        </div>

        <script dangerouslySetInnerHTML={{__html: dataScript}}></script>
      </Layout>
    );
  }
}

