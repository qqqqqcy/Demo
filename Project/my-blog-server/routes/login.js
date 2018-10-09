const express = require('express')
const router = express.Router()
const response = require('../models/common.js').response

const checkNotLogin = require('../middlewares/check').checkNotLogin
const users = require('config-lite')(__dirname).users.items
const findUser = ({account, password}) => {
  return users.find(item =>
    item.account === account && item.password === password
  );
};

// GET /signin 登录页
router.post('/', checkNotLogin, function (req, res, next) {
  let {account,password} = req.body

  try {
    if (!account) {
      throw new Error('请填写账号')
    }
    if (!password) {
      throw new Error('请填写密码')
    }
    let user = findUser(req.body)

    if (user) {
      // 客户端第一次链接到服务器,服务器会自动给他分配一个 session.id
      // 可以调用 req.session.id 获取得到这个值
      // 如果服务器调用 req.session.regenerate
      // 会给客户端产生一个新的 session.id 取代自动生成的那个
      req.session.regenerate(function (err) {
        if (err) {
          throw new Error('登录失败')
        }
        req.session.user = user.account;
        return res.json(response())
      });
    } else{
      throw new Error('登录失败')
    }
  } catch (e) {
    console.log('登录失败')
    return res.json(response(e))
  }
})

module.exports = router