const response = require('../models/common.js').response

module.exports = {
  checkLogin: function (req, res, next) {
    if (!req.session.user) {
      return res.json(response('请先登录', '3'))
    }
    next()
  },

  checkNotLogin: function (req, res, next) {
    if (req.session.user) {
      return res.json(response('您已登录', '3'))
    }
    next()
  },

  checkArticleContent: function (req, res, next) {
    const {
      title,
      tag,
      content
    } = req.body

    try {
      if (!title) {
        throw new Error('请填写标题')
      }
      if (!tag) {
        throw new Error('请选择标签')
      }
      if (!content) {
        throw new Error('请填写内容')
      }
    } catch (e) {
      return res.json(response(e))
    }
    next()
  }
}