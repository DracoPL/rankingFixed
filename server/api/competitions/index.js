'use strict';

var express = require('express');
var controller = require('./competitions.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.post('/:id/begin', controller.begin);
router.post('/:id/new-round', controller.newRound);

module.exports = router;
