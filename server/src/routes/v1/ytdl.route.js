const express = require('express');
const ytdlController = require('../../controllers/ytdl.controller');

const router = express.Router();

router.get('/download', ytdlController.download);

module.exports = router;
