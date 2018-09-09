const express = require('express')
const router = express.Router()
const response = require('../models/common.js').response

const checkNotLogin = require('../middlewares/check').checkNotLogin
const users = require('config-lite')(__dirname).users.items
const findUser = (name, password) => {
  return users.find(item =>
    item.name === name && item.password === password
  );
};

// GET /signin 登录页
router.post('/', checkNotLogin, function (req, res, next) {
  let data = req.body
  if (!data.account) {
    res.json(response('请输入账号'))
  } else
  if (!data.password) {
    res.json(response('请输入密码'))
  } else
  if (findUser(data.account, data.password)) {
    req.session.regenerate(function (err) {
      if (err) {
        res.json(response('登录失败'))
      }
      req.session.loginUser = user.name;
      res.json(response())
    });
  } else {
    res.json(response('账号或者密码错误'))
  }

  // let user = findUser(req.body.name, req.body.pwd);
})

module.exports = router