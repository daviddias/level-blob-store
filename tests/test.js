var test = require('tape')
var abstractBlobTests = require('abstract-blob-store/tests')
var levelBlobStore = require('../src')
var os = require('os')
var rimraf = require('rimraf')

var path = os.tmpdir() + '/level'

var common = {
  setup: function (t, cb) {
    var store = levelBlobStore(path)
    cb(null, store)
  },
  teardown: function (t, store, blob, cb) {
    store.db.close(function (err) {
      if (err) {
        console.error(err)
      }
      rimraf(path, cb)
    })
  }
}

abstractBlobTests(test, common)
