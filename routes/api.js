'use strict';

var express = require('express');
var router = express.Router();

router.use('/movies', require('./movies'));

module.exports = router;