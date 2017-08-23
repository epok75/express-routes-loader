# express-routes-loader  [![Build Status](https://travis-ci.org/epok75/express-routes-loader.svg?branch=master)](https://travis-ci.org/epok75/express-routes-loader)
Routes loader for expressjs.

## Installation

```javascript
npm install express-route-loader
```

## Usage

users.js (route)
```javascript
'use strict'

function post(req, res) {
  res.send()
}

function get(req, res) {
  res.send()
}

module.exports = [
  {
    method: 'post',
    url: 'users',
    handler: post,
    summary: 'create user',
    description: 'create user',
    tags: ['users']
  },
  {
    method: 'get',
    url: 'users/:id',
    handler: get,
    summary: 'get user',
    description: 'get user',
    tags: ['users']
  }
]
```

app.js
```javascript
'use strict'

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const loader = require('express-routes-loader')

let port = process.env.port || 8080

let app = express()

app.use(bodyParser.json())

// register your routes
const dirs = [path.join(__dirname, 'src', 'routes'), 'api']
const routes = loader(dirs)

app.listen(port, function () {
  console.log(`App listening on port ${port}`)
})
```

You can either pass a single or multiple directories to the loader
```javascript
const singleDir = [path.join(__dirname, 'src', 'routes'), 'api']
const multipleDirs = [
  [path.join(__dirname, 'src', 'routes', 'users'), 'api', 'users'],
  [path.join(__dirname, 'src', 'routes', 'events'), 'api', 'events']
]

```

**args** (Array, String,...)
* Array: folder(s) to be inspected
* String to ...n arguments: prefixes that will be applied to the endpoint

## Tests

```javascript
npm test
```
