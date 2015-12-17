level-blob-store
================

[![](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg?style=flat-square)](http://ipn.io) [![](https://img.shields.io/badge/project-IPFS-blue.svg?style=flat-square)](http://ipfs.io/) [![](https://img.shields.io/badge/freenode-%23ipfs-blue.svg?style=flat-square)](http://webchat.freenode.net/?channels=%23ipfs) [![Build Status](https://travis-ci.org/diasdavid/level-blob-store.svg)](https://travis-ci.org/diasdavid/level-blob-store) 
![](https://img.shields.io/badge/coverage-%3F-yellow.svg?style=flat-square) [![Dependency Status](https://david-dm.org/diasdavid/level-blob-store.svg?style=flat-square)](https://david-dm.org/diasdavid/level-blob-store) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)

> A abstract-blob-store compatible implementation built using leveldb as the storage backend

![](https://github.com/maxogden/abstract-blob-store/raw/master/badge.png)

# Description

Implements [abstract-blob-store](https://github.com/maxogden/abstract-blob-store) interface, uses leveldb as the backend storage.
[leveldb is pretty awesome btw](https://www.youtube.com/watch?v=-vD33vPKcAM)

Disclaimer: As Max Ogden pointed out at https://github.com/maxogden/abstract-blob-store/issues/19#issuecomment-165211290, levelDB:

- LevelDB doesn't support streaming file writes, so values must fit in memory.
- In Google LevelDB compaction is notoriously inefficient in heavy write scenarios, so writing large quantities of data will likely result in lots of CPU thrashing.

# API

See [abstract-blob-store](https://github.com/maxogden/abstract-blob-store)
