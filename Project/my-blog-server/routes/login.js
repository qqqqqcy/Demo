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

  try {
    if (!data.account) {
      throw new Error('请填写账号')
    }
    if (!data.password) {
      throw new Error('请填写密码')
    }
    let user = findUser(data.account, data.password)
    if (user) {
      // 客户端 第一次链接到服务器 服务器会自动给他分配一个 session.id
      // 可以调用 req.session.id 获取得到这个值
      // 如果服务器调用 req.session.regenerate
      // 会给客户端 产生一个新的 session.id 取代自动生成的那个
      req.session.regenerate(function (err) {
        if (err) {
          throw new Error('登录失败')
        }
        req.session.user = user.name;
        res.json(response())
      });
    }
    throw new Error('登录失败')
  } catch (e) {
    return res.json(response(e))
  }
})

module.exports = router