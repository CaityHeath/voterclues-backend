'use strict';

const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

const representatives = mongoose.Schema({
  cid: { type:String, required:true, unique:false },
  name: { type:String, required:true, unique:true },
  party: { type:String, required:true, unique:false },
  office: { type:String, required:true, unique:false },
  first_elected: { type:String, required:false, unique:false},
  phone: { type:String, required:true, unique:false },
  website: { type:String, required:true, unique:true },
  congress_office: { type:String, required:true, unique:false },
  twitter_id: { type:String, required:false, unique:true },
  birthdate: { type:String, required:true, unique:false }
});

module.exports = mongoose.model('representatives', representatives);