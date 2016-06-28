const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const commentSchema = mongoose.Schema({
  author: {type: ObjectId, required: true, ref: 'User'},
  // article: {type: ObjectId, required: true, ref: 'Article'}
  text: {type: String, required: true},
  date: {type: Date, required: true},
  rating: {type: Number, default: 0}
});

const NO_COMMENT_DATA = "Haven't got any comment details, try again.";
const NO_COMMENT_ID = "Haven't got comment id, try again.";

commentSchema.statics.addComment = (dataObj) => {
  if (!dataObj) return Promise.reject({error: NO_COMMENT_DATA});

  return new Promise(function(resolve, reject) {
    Comment.create(dataObj, (err, item)=>{
      if (err) return reject(err);

      resolve(item);
    });
  });
}

commentSchema.statics.updateComment = (dataObj) => {
  if (!dataObj._id) return Promise.reject({error: NO_COMMENT_ID});

  return new Promise(function(resolve, reject) {
    Comment.findByIdAndUpdate(dataObj._id, dataObj, {'new': true}, (err, item)=>{
      if (err) return reject(err);

      resolve(item);
    });
  });
}

commentSchema.statics.deleteComment = (commentId) => {
  if (!commentId) return Promise.reject({error: NO_COMMENT_ID});

  return new Promise(function(resolve, reject) {
    Comment.findByIdAndRemove(commentId, (err, item)=>{
      if (err) return reject(err);

      if (!item) {
        reject({error: `No comment with ID ${commentId} has been found.`})
      }
      resolve(item);
    });
  });
}

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
