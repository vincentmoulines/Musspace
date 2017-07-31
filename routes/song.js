const express = require('express');
const song = require('../models/song');
const TYPES = require('../models/song-types');
const router = express.Router();
const {ensureLoggedIn } = require('connect-ensure-login');

router.get('/new', (req, res) => {
  res.render('song/new', { types: TYPES });
});
