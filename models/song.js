const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const TYPES    = require('./song-types');

const SongSchema = new Schema({
  title : {type: String, required: true},
  author : {type: String, required: true},
  category : {type: String, enum: TYPES, required; true},
  length: {type: Number, default: 0}
  link: {type: String, required: true},
});

module.exports = mongoose.model('song', songSchema);
