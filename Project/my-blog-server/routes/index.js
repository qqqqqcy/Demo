module.exports = function (app) {
  // app.get('/', function (req, res) {
  //   res.redirect('/posts')
  // })
  app.use('/login', require('./login'))
  // app.use('/signup', require('./signup'))
  app.use('/logout', require('./logout'))
  app.use('/article', require('./article'))
  // app.use('/comments', require('./comments'))
  // 404 page
  app.use(function (req, res) {
    if (!res.headersSent) {
      res.status(404).send('404')
    }
  })
  // app.use(function (err, req, res, next) {
  //   console.error(err)
  //   req.send('error', err.message)
  //   res.redirect('/posts')
  // })
}