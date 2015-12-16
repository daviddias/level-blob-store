var level = require('level')
var stream = require('stream')

exports = module.exports = LevelBlobStore

function LevelBlobStore (opts) {
  if (!(this instanceof LevelBlobStore)) {
    return new LevelBlobStore(opts)
  }

  var self = this

  if (typeof opts === 'string') {
    self.path = opts
  } else {
    self.path = opts.path
  }

  var db = level(self.path)
  self.db = db

  self.createWriteStream = function (opts, cb) {
    if (typeof opts === 'string') {
      opts = {key: opts}
    }
    if (opts.name) {
      opts.key = opts.name
    }
    if (!cb) {
      cb = noop
    }

    var bufferStream = new stream.PassThrough()
    var buffer

    bufferStream.on('data', function (chunk) {
      if (!buffer) buffer = chunk
      else {
        buffer = Buffer.concat([buffer, chunk], buffer.length + chunk.length)
      }
    })

    bufferStream.on('end', function () {
      writeBuf()

      function writeBuf () {
        db.put(opts.key, buffer, function (err) {
          if (err) {
            return cb(err)
          }

          var metadata = {
            key: opts.key,
            size: buffer.length,
            name: opts.key
          }

          cb(null, metadata)
        })
      }
    })

    return bufferStream
  }

  self.createReadStream = function (opts) {
    if (typeof opts === 'string') {
      opts = {key: opts}
    }
    if (opts.name) {
      opts.key = opts.name
    }

    var passThrough = new stream.PassThrough()

    db.get(opts.key, function (err, value) {
      if (err) {
        if (err.notFound) {
          console.log('NOT FOUND')
          return passThrough.emit('error', err)
        }
      }
      passThrough.write(value)
      passThrough.end()
    })

    return passThrough
  }
  self.exists = function (opts, cb) {
    if (typeof opts === 'string') {
      opts = {key: opts}
    }
    if (opts.name) {
      opts.key = opts.name
    }
    if (!cb) {
      cb = noop
    }

    db.get(opts.key, function (err, res) {
      if (err) {
        if (err.notFound) {
          return cb(null, false)
        }
        return cb(err)
      }
      cb(null, true)
    })
  }

  self.remove = function (opts, cb) {
    if (typeof opts === 'string') {
      opts = {key: opts}
    }
    if (opts.name) {
      opts.key = opts.name
    }
    if (!cb) {
      cb = noop
    }

    db.del(opts.key, function (err) {
      if (err) {
        return cb(err)
      }
      cb()
    })
  }
}

function noop () {}
