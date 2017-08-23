'use strict'

function post (req, res) {
  res.send()
}

function get (req, res) {
  res.send()
}

const route = [
  {
    method: 'post',
    url: 'import',
    handler: post,
    summary: 'Import data',
    description: 'Import data',
    tags: ['survey']
  },
  {
    method: 'get',
    url: 'import/:id',
    handler: get,
    summary: 'Get imported data',
    description: 'Get imported data',
    tags: ['survey']
  }
]

module.exports = route
