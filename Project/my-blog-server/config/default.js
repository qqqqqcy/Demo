module.exports = {
  port: 8088,
  session: {
    secret: 'myblog',
    key: 'myblog',
    maxAge: 2592000000
  },
  users: {
    items: [{
      account: 'admin',
      password: '123456'
    }]
  },
  mongodb: 'mongodb://localhost:27017/myblog'
}