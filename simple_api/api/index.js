const router = require('express').Router();
const mocks = require('./mock');
const uniqid = require('uniqid');

const reply = (res, body, timeout = 1000, status = 200) =>
  setTimeout(() => {
    res.status(status).json(body)
  }, timeout);

router.get('/article', (req, res, next) => {

    const articles = mocks.articles,
        limit = Number(req.query.limit) || articles.length,
        offset = Number(req.query.offset) || 0;

    reply(res, articles.slice(offset, limit + offset));

});

router.get('/article/:id', (req, res, next) => {

  const article = mocks.articles.find(article => article.id === req.params.id);

  if(article) return reply(res, article, 950);

  reply(res, { error: 'not found' }, 100, 404);
});

router.delete('/article/:id', (req, res, next) => {

    const article = mocks.articles.find(article => article.id === req.params.id);

    if(article) {

      if(article.hasOwnProperty("comments")){
          article.comments.forEach(commentId => {
              const comment = mocks.comments.find(comment => comment.id === commentId);
              mocks.comments.splice(mocks.comments.indexOf(comment), 1);
          });
      }
      mocks.articles.splice(mocks.articles.indexOf(article), 1);
      return reply(res, {status: "OK"});
    }

    reply(res, { error: 'not found' }, 100, 404);
});

router.post('/article', (req, res, next) => {

  const body = req.body;

  const article = {
    title: body.title,
    text: body.text,
    id: uniqid(),
    date: new Date(),
    comments: []
  };

  mocks.articles.push(article);
  reply(res, article);
});

router.get('/comment', (req, res, next) => {

  const aid = req.query.article;

  if (aid) {
    const article = mocks.articles.find(article => article.id === aid);

    return reply(
      res,
      (article.comments || []).map(id => mocks.comments.find(comment => comment.id === id))
    );
  }

  const limit = Number(req.query.limit) || mocks.comments.length,
    offset = Number(req.query.offset) || 0;

  reply(res, {
    total: mocks.comments.length,
    records: mocks.comments.slice(offset, limit + offset)
  });

});

router.post('/comment', (req, res, next) => {
  const comment = {
    id: uniqid(),
    text: req.body.text,
    user: req.body.user
  };

  const targetArticle = mocks.articles.find(article => article.id === req.body.articleId);

  mocks.comments.push(comment);
  targetArticle.comments.push(comment.id);

  reply(res, {id: comment.id});
});

module.exports = router;
