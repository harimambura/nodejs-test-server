const mongoose = require('mongoose'),
      user = require('./User.js'),
      comment = require('./Comment');
var ObjectId = mongoose.Schema.Types.ObjectId;

var articleSchema = mongoose.Schema({
  title: {type: String, required: true},
  link: {type: String, required: true},
  rating: {type: Number},
  date: Date,
  author: {type: ObjectId, ref: 'User', required: true},
  comments: [{type: ObjectId, ref: 'Comment'}]
});

const NO_ARTICLE_DATA = "Haven't got any article details, try again.";
const NO_ARTICLE_ID = "Did not provide article ID.";


/*******************************/
//Add article:
//data object params:
//title: String
//author: user ID
//link: url link as string
//date: Date, optional

articleSchema.statics.addArticle = (dataObj, cb) => {
  if (!dataObj) return cb({error: NO_ARTICLE_DATA });
  if (!dataObj.author) return cb({error: `Did not provide user ID.`});
debugger;
  user.checkUserById(dataObj.author)
  .then((usr) => {
    Article.create(dataObj, (err, item) => {
      if (err) return cb(err);

      user.addArticle(usr.username, item._id, (err) => {
        err ? cb(err) : cb(null, item);
      });
    });
  })
  .catch((err) => {cb(err)});
}

articleSchema.statics.getArticle = (articleId, cb) => {
  if(!articleId) return cb({error: NO_ARTICLE_ID});

  Article.findById(articleId, (err, item) =>{
    return err ? cb(err) : cb(null, item);
  });
}

articleSchema.statics.getArticles = (cb) => {
  Article.find((err, item) => {
    return err ? cb(err) : cb(null, item);
  });
}

articleSchema.statics.editArticle = (dataObj, cb) => {
  if (!dataObj) return cb({error: NO_ARTICLE_DATA });

  Article.findByIdAndUpdate(dataObj._id, dataObj, (err, item)=>{
    return err ? cb(err) : cb(null, item);
  });
}

articleSchema.statics.deleteArticle = (articleId, cb) => {
  if(!articleId) return cb({error: NO_ARTICLE_ID});

  Article.findByIdAndRemove(articleId, (err, item) =>{
    if (err) return cb(err);

    user.checkUserById(item.author)
    .then(usr => {
      user.removeArticle(usr.username, articleId, (err) => {
        err ? cb(err) : cb(null, item);
      });
    })
    .catch((err) => {cb(err)});
  });

}

/************************************/
// Add comment data object:
//text: String, text of commnet
//user: ObjectId, ID of user

articleSchema.statics.addComment = (articleId, dataObj, cb) => {
  if (!articleId) return cb({error: NO_ARTICLE_ID});
  if (!dataObj) return cb({error: `Haven't got any comment data.`});

  Article.findById(articleId, (err, article) => {
    if (err) return cb(err);

    user.checkUserById(dataObj.user)
    .then((usr) =>{
      dataObj.author = usr._id;
      dataObj.rating = 0;
      dataObj.date = Date.now();

      comment.addComment(dataObj)
      .then((newComment) => {         // add comment to article
        article.comments.push(newComment._id);

        Article.editArticle(article, (err) => {
          if (err) return cb(err);

          user.addComment(usr._id, newComment._id, err => { //add comment record to user
            err ? cb(err) : cb(null, newComment);
          });
        });
      })
      .catch((err) => {cb(err)});
    })
    .catch((err) => {cb(err)});
  });
}
/************************************/
// remove comment data object:
//commentId: ObjectId, ID of commnet

articleSchema.statics.removeComment = (articleId, dataObj, cb) => {
  if (!articleId) return cb({error: NO_ARTICLE_ID});
  if (!dataObj) return cb({error: `Haven't got any comment data.`});

  Article.findById(articleId, (err, article) => {
    if (err) return cb(err);

    comment.deleteComment(dataObj.commentId)
    .then((oldComment) => {         // remove comment from article
      article.comments.splice(article.comments.indexOf(oldComment._id), 1);
      Article.editArticle(article, err => {
        if (err) return cb(err);

        user.removeComment(oldComment.author, oldComment._id, err => { //remove comment from user record
          err ? cb(err) : cb(null, oldComment);
        });
      });
    })
  .catch((err) => {cb(err)});
  });
}

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;
