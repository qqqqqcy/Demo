const express = require('express')
const router = express.Router()
const response = require('../models/common.js').response

const checkLogin = require('../middlewares/check').checkLogin

// POST /logout 登出
router.post('/', checkLogin, function (req, res, next) {
  req.session.user = null
  res.json(response())
})

module.exports = router