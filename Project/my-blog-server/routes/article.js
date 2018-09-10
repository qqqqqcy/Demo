const express = require('express')
const router = express.Router()
const response = require('../models/common.js').response
const ArticleModel = require('../models/article.js')

const checkLogin = require('../middlewares/check').checkLogin
const checkArticleContent = require('../middlewares/check').checkArticleContent

// GET 获取文章
router.get('/', function (req, res, next) {
  if (req.query.articleId) {
    // 指定文章
    ArticleModel.query(req.query.articleId).then(data =>
      res.json(response(data))
    ).catch(err => res.json(response(err)))
  } else {
    // 所以文章
    ArticleModel.queryAll().then(data =>
      res.json(response({
        articleList: data
      }))
    ).catch(err => res.json(response(err)))
  }
})

// POST 发表一篇文章
router.post('/', checkLogin, checkArticleContent, function (req, res, next) {

  const article = {
    title: req.body.title,
    content: req.body.content,
    createDate: new Date(),
    updateDate: new Date()
  }

  ArticleModel.create(article).then((data) => {
    res.json(response({
      articleId: data._id
    }))
  }).catch(err => res.json(response(err)))
})

// PUT 修改文章
router.put('/', checkLogin, checkArticleContent, function (req, res, next) {
  const article = {
    title: req.body.title,
    content: req.body.content,
    updateDate: new Date()
  }

  ArticleModel.query(req.body.articleId)
    .then((data) => {
      Object.assign(data, article)
      return ArticleModel.update(data)
    })
    .then((data) => {
      res.json(response({
        articleId: data._id
      }))
    })
    .catch(
      err => res.json(response(err))
    )
})

// DELETE 删除文章
router.delete('/', checkLogin, function (req, res, next) {
  ArticleModel.delete(req.body.articleId)
    .then((data) => {
      res.json(response())
    })
    .catch(
      err => res.json(response(err))
    )
})


// GET /posts/:postId/edit 更新文章页
router.get('/:postId/edit', checkLogin, function (req, res, next) {
  res.send('更新文章页')
})

// POST /posts/:postId/edit 更新一篇文章
router.post('/:postId/edit', checkLogin, function (req, res, next) {
  res.send('更新文章')
})

// GET /posts/:postId/remove 删除一篇文章
router.get('/:postId/remove', checkLogin, function (req, res, next) {
  res.send('删除文章')
})

module.exports = router