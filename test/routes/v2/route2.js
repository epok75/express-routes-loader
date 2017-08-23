'use strict'

function post (req, res) {
  res.send()
}

function get (req, res) {
  res.send()
}

module.exports = [
  {
    method: 'post',
    url: 'hello',
    handler: post,
    summary: 'Hello',
    description: 'Hello',
    tags: ['hello']
  },
  {
    method: 'get',
    url: 'hello/:id',
    handler: get,
    summary: 'Get Hello',
    description: 'Get Hello',
    tags: ['hello']
  }
]
