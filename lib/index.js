'use strict'

const fs = require('fs')
const debug = require('debug')('express-route-loader')
const path = require('path')

/**
 * entry point to be called when wanted to load dynamically
 * your routes.
 * return all imported routes.
 *
 * arg
 * ---
 * you want to explore the whole directory tree applying
 * the same prefix to every routes
 * [
 *   path.join(__dirname, 'src', 'routes'),
 *   'api',
 *   'v1'
 * ]
 *
 * you want to explore multiple directories applying
 * different prefix to everyone
 * [
 *   [
 *     path.join(__dirname, 'src', 'users'),
 *     'api',
 *     'v1',
 *     'users'
 *   ],
 *   [
 *     path.join(__dirname, 'src', 'routes', 'events'),
 *     'api',
 *     'events'
 *   ]
 * ]
 *
 * first array entry = directory you wnat to explore
 * second...n = prefix you want to apply to te final endpoint
 *
 * @param  {Array.<String...>|Array.<Array>} routes  directories you want to
 *                                                   explore with extra configuration
 * @return {Array.<Object>}   imported routes
 */
function load (routes) {
  if (!Array.isArray(routes) || routes.length === 0) {
    throw new Error('argument should be an array not empty.')
  }

  if (!Array.isArray(routes[0])) {
    routes = [routes]
  }

  return routes.map(route => _getFiles(route))
               .reduce((acc, routes) => acc.concat(routes), [])
}

/**
 * return all imported routes
 * @param  {Array.<String...>} route   directory with extra configuration
 * @return {Array.<Object>}            imported routes
 */
function _getFiles (route) {
  const dir = route[0]
  const prefix = route.splice(1).join('/')

  return _browseDir(dir)
    .map(file => require(file))
    .reduce((acc, routes) => acc.concat(routes), [])
    .map(routes => _normalizeUrl(routes, prefix))
}

/**
 * explore directories and store files in an array
 * @param {String} dir       directory absolute path
 * @param {Array.<String>} fileList   store all files
 * @param {Array.<String>} fileList   return all files
 */
function _browseDir (dir, fileList) {
  fileList || (fileList = [])

  try {
    fs.readdirSync(dir)
      .map(item => _buildFullPath(dir, item))
      .map(item => _addFileOrContinueBrowsing(item, fileList))
  } catch (e) {
    throw new Error(e.message)
  }

  return fileList
}

/** build absolute path */
const _buildFullPath = (dir, name) => path.resolve(`${dir}/${name}`)

/**
 * add file to the bucket or continue browsing
 * @param {String} item               can be a file or directory
 * @param {Array.<String>} fileList   store all files
 */
function _addFileOrContinueBrowsing (item, fileList) {
  !fs.statSync(item).isDirectory() ? fileList.push(item) : _browseDir(item, fileList)
}

/**
 * clone and return route object after having normalized url
 * @param  {Array.<Object>} route    imported route object
 * @param  {String} prefix  route prefix to be added
 * @return {Object}
 */
function _normalizeUrl (route, prefix) {
  const _route = Object.assign({}, route)
  const url = _route.url
                 .replace(/^\//, '')
                 .replace(/\/$/, '')

  // build prefix
  prefix = prefix ? `/${prefix}` : ''
  _route.url = url ? `${prefix}/${url}/` : `${prefix}/`

  debug(`rewritting url: ${_route.url}`)

  return _route
}

module.exports = load
