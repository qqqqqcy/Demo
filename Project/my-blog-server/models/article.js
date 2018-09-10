const Article = require('../lib/mongo.js').Article

module.exports = {
    // 创建一篇文章
    create: function (article) {
        return new Article(article).save()
    },
    update: function (article) {
        return article.save()
    },
    delete: function (articleId) {
        return Article.remove({
            _id: articleId
        })
    },
    query: function (articleId) {
        return Article.findOne({
            _id: articleId
        })
    },
    queryAll: function () {
        return Article.find()
    }
}