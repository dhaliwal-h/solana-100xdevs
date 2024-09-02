const express = require('express');
const router = express.Router();
const verifyController = require('../controllers/verifyController');
const fileUtils = require('../utils/fileUtils');

router.post('/', fileUtils.single('file'), verifyController.verifyContent);

module.exports = router;
