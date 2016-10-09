/*!
 * koa-react-view - example/app.js
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

const staticCache = require('koa-static-cache');
const register = require('babel-register');
const react = require('./react-view.js');
const path = require('path');
const koa = require('koa');
const route = require('koa-route');

const app = koa();

const viewpath = path.join(__dirname, 'views');
const assetspath = path.join(__dirname, '../public');

react(app, { views: viewpath });

// imports babel runtime for JSX views, warning: live transpiling
// best to precompile in production deploys for perf + reliability
register({
  presets: [ 'es2015', 'react' ],
  extensions: [ '.jsx' ],
});

app.use(staticCache(assetspath));

app.use(route.get('/', index));

function *index() {
  this.render('index', {
    title: 'List',
    list: [
      'hello koa',
      'hello react'
    ]
  });
}

app.listen(3000);
console.log('server start listen at 3000');
