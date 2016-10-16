/*!
 * koa-react-view - index.js
 * MIT Licensed
 * Borrowed from Here and adapted to ECAMScript 2015:
 *   https://github.com/koajs/react-view
 */

'use strict';

/**
 * Module dependencies.
 */

const ReactDOMServer = require('react-dom/server');
const beautifyHTML = require('js-beautify').html;
const assert = require('assert');
const copy = require('copy-to');
const React = require('react');
const path = require('path');

const defaultOptions = {
  doctype: '<!DOCTYPE html>',
  beautify: false,
  cache: process.env.NODE_ENV === 'production',
  extname: 'jsx',
  writeResp: true,
  views: path.join(__dirname, 'views'),
  internals: false
};

module.exports = function (app, _options) {
  _options = _options || {};

  let options = {};
  copy(_options).and(defaultOptions).to(options);
  options.views = path.resolve(options.views);
  options.extname = options.extname.replace(/^\.?/, '.');

  // match function for cache clean
  const match = createMatchFunction(options.views);

  /**
   * render react template to html
   *
   * @param {String} filename
   * @param {Object} _locals
   * @return {String}
   */
  app.context.render = function(filename, _locals, internals) {
    // resolve filepath
    let filepath = path.join(options.views, filename);
    if (filepath.indexOf(options.views) !== 0) {
      const err = new Error('Cannot find module ' + filename);
      err.code = 'REACT';
      throw err;
    }
    if (!path.extname(filepath)) filepath += options.extname;

    if (typeof _locals === 'boolean') {
      internals = _locals;
      _locals = {};
    }
    internals = internals !== undefined
      ? internals
      : options.internals;

    // const render = internals
    //   ? ReactDOMServer.renderToString
    //   : ReactDOMServer.renderToStaticMarkup;
    const render = ReactDOMServer.renderToStaticMarkup;
    //const render = ReactDOMServer.renderToString;

    let locals = {};
    // merge koa state
    merge(locals, this.state || {});
    merge(locals, _locals);

    let markup = options.doctype || '';
    try {
      let component = require(filepath);
      // Transpiled ES6 may export components as { default: Component }
      component = component.default || component;
      markup += render(React.createElement(component, locals));
    } catch (err) {
      err.code = 'REACT';
      throw err;
    } finally {
      if (!options.cache) {
        cleanCache(match);
      }
    }

   if (options.beautify) {
      // NOTE: This will screw up some things where whitespace is important, and be
      // subtly different than prod.
      markup = beautifyHTML(markup);
    }

    const writeResp = locals.writeResp === false
      ? false
      : (locals.writeResp || options.writeResp);
    if (writeResp) {
      this.type = 'html';
      this.body = markup;
    }

    return markup;
  };
};


/**
 * merge source to taget
 *
 * @param {Object} target
 * @param {Object} source
 * @return {Object}
 */
function merge(target, source) {
  for (let key in source) {
    target[key] = source[key];
  }

  return target;
}

/**
 * create a match function for clean cache
 *
 * @param {Mixed} input
 * @return {Function}
 */
function createMatchFunction(input) {
  if (!Array.isArray(input)) input = [input];

  input = input.map(function (item) {
    return typeof item === 'string'
      ? new RegExp('^' + item)
      : item;
  });

  return function match(file) {
    for (let i = 0; i < input.length; i++) {
      if (input[i].test(file)) return true;
    }
  };
}

/**
 * Remove all files from the module cache that are in the view folder.
 *
 * @param {Function} match
 */
function cleanCache(match) {
  Object.keys(require.cache).forEach(module => {
    if (match(require.cache[module].filename)) {
      delete require.cache[module];
    }
  });
}
