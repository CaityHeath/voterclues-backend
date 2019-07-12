'use strict';

const Model = require('../mongo.js');
const schema = require('./reps-schema.js');

class Representatives extends Model {}

module.exports = new Representatives(schema);