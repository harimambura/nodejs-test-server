const express = require('express'),
      router =  express.Router(),
      article = require('../models/Article');


router.route('/random')
.get((req, res)=>{
  article.getArticles((err, items)=>{
    err ? req.handler(err) : req.handler(null, items[Math.floor(Math.random() * items.length)]);
  });
});

router.route('/:startIndex/:count')
.get((req, res)=>{
  var index = Number(req.params.startIndex),
      count = Number(req.params.count);

  if (isNaN(index) || isNaN(count)){
    return req.handler({error: 'Provide an invalid index or count.'})
  }

  article.getArticles((err, items)=>{
    err ? req.handler(err) : req.handler(null, items.slice(req.params.startIndex, req.params.count));
  });
});

router.route('/')
.post((req, res)=>{
  article.addArticle(req.body, req.handler);     //add article
});

router.route('/:id')
.get((req, res)=>{                      //get article by id
  article.getArticle(req.params.id, req.handler);
})
.put((req, res)=>{                      //update article
  var updateObj = {
    _id: req.params.id,
    title: req.body.title,
    link: req.body.link,
    rating: req.body.rating,
    date: req.body.date,
    author: req.body.author
  };

  article.editArticle(updateObj, req.handler);
})
.delete((req, res)=>{                   //delete article
  article.deleteArticle(req.params.id, req.handler);
});

router.route('/:id/comments')
.post((req, res)=>{
  article.addComment(req.params.id, req.body, req.handler);
})
.delete((req, res)=>{
  article.removeComment(req.params.id, req.body, req.handler);
});






module.exports = router;
