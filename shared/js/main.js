const Content = require('./components/content.jsx');
const unescapeHtml = require('unescape-html');
const React = require('react');
const ReactDOM = require('react-dom');


(function() {
  const container = document.querySelector('#content');
  let list = unescapeHtml(window.__list__);
  list = JSON.parse(list);
  // reuse server side render result

  ReactDOM.render(
    <Content list={list}/>,
    container
  );

})();
