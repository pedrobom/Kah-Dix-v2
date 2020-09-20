const gulp = require('gulp')
const { series, parallel } = require('gulp')

const task1 = require('./tests/test1')
const task2 = require('./tests/test2')
const connection = require('./tests/connection')

module.exports.default = parallel(
    connection
)