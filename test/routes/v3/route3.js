'use strict'

function post (req, res) {
  res.send()
}

module.exports = [
  {
    method: 'post',
    url: '',
    handler: post,
    summary: 'Hello',
    description: 'Hello',
    tags: ['hello']
  },
  {
    method: 'get',
    url: '/',
    handler: post,
    summary: 'Hello',
    description: 'Hello',
    tags: ['hello']
  }
]
