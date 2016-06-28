const mongoose = require('mongoose'),
      comment = require('./Comment');

var ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: String,
  registrationDate: {type:Date, default: Date.now()},
  postedComments: [{type: ObjectId, ref: 'Comment'}],
  postedArticles: [{type: ObjectId, ref: 'Article'}]
});

const NO_USER_DATA = "Haven't got any user details, try again.";

userSchema.statics.addUser = (dataObj, cb) => {
  if (!dataObj) return cb({error: NO_USER_DATA });

  User.count({username: dataObj.username}, (err, count)=>{
    if (err) return cb(err);

    if (!count) {
      User.create(dataObj, (err, item) => {
        return err ? cb(err) : cb(null, item);
      });
    } else {
      cb({error: 'This username is alleady exists.'});
    }
  });
}

userSchema.statics.findUser = (dataObj, cb) => {
  if (!dataObj) return cb({error: NO_USER_DATA });

  User.find({username: dataObj.username}, (err, items)=>{
    if (err) return cb(err);

    if (!items.length) return cb({error: `No user found with ${dataObj.username} nickname.`});

    cb(null, items[0]);
  });
}

userSchema.statics.editUser = (dataObj, cb) => {
  if (!dataObj) return cb({error: NO_USER_DATA });

  User.findOneAndUpdate({username: dataObj.username}, dataObj, {'new': true}, (err, item)=>{
    if (err) return cb(err);

    cb(null, item);
  });
}

userSchema.statics.deleteUser = (dataObj, cb) => {
  if (!dataObj) return cb({error: NO_USER_DATA });

  User.findOneAndRemove({username: dataObj.username}, (err, item)=>{
    if(err) return cb(err);

    // TODO: check user rights, check authentication
    cb(null, item);
  });
}

function getValuesByIds(item, model, propertyName, cb){
  var promises = [];

  item[propertyName].map((item, ind)=>{
    promises.push(model.findById(item).exec());
  });

  Promise.all(promises)
  .then(values => cb(null, values));
}

userSchema.statics.getUserComments = (dataObj, cb) => {
  if (!dataObj) return cb({error: NO_USER_DATA });

  User.findOne({username: dataObj.username}, (err, item) =>{
    if(err) return cb(err);
    if(!item) return cb({error: `No user with '${dataObj.username}' username found.`});

    getValuesByIds(item, comment, 'postedComments', cb);
  });
}

userSchema.statics.getUserArticles = (dataObj, cb) => {
  if (!dataObj) return cb({error: NO_USER_DATA });
  var artcile = require('./Artcile');

  User.findOne({username: dataObj.username}, (err, item) =>{
    if(err) return cb(err);
    if(!item) return cb({error: `No user with '${dataObj.username}' username found.`});

    getValuesByIds(item, article, 'postedArticles', cb);
  });
}

//system methods
userSchema.statics.addComment = (userId, commentId, cb) => {
  if (!userId) return cb({error: 'User ID is not valid.'});
  if (!commentId) return cb({error: 'Comment id is not valid.'});


  var result = User.findById(userId, (err, user) => {
    if (err) return cb(err);

    user.postedComments.push(commentId);
    return User.editUser(user, cb);
  });
}

userSchema.statics.removeComment = (userId, commentId, cb) => {
  if (!userId) return cb({error: 'User ID is not valid.'});
  if (!commentId) return cb({error: 'Comment id is not valid.'});


  var result = User.findById(userId, (err, user) => {
    if (err) return cb(err);

    user.postedComments.splice(user.postedComments.indexOf(commentId), 1);
    return User.editUser(user, cb);
  });
}

userSchema.statics.addArticle = (username, articleId, cb) => {
  if (!username) return cb({error: 'Username is not valid.'});
  if (!articleId) return cb({error: 'Comment id is not valid.'});


  var result = User.findOne(username, (err, user) => {
    if (err) return cb(err);

    user.postedArticles.push(articleId);
    return User.editUser(user, cb);
  });
}

userSchema.statics.removeArticle = (username, articleId, cb) => {
  if (!username) return cb({error: 'Username is not valid.'});
  if (!articleId) return cb({error: 'Comment id is not valid.'});


  var result = User.findOne(username, (err, user) => {
    if (err) return cb(err);

    user.postedArticles.splice(user.postedArticles.indexOf(articleId), 1);
    return User.editUser(user, cb);
  });
}

userSchema.statics.checkUser = (username) => {
  if (!username) return Promise.reject({error: `Did not provide username.`});

  return new Promise(function(resolve, reject) {
    User.findOne(username).exec().then(val => {
      if (!val) {
        reject({error: `No user with username '${username}' has been found.`});
      }
      resolve(val);
    })
    .catch((err) => {reject(err)});
  });
}

userSchema.statics.checkUserById = (id) => {
  if (!id) return Promise.reject({error: `Did not provide user ID.`});

  return new Promise(function(resolve, reject) {
    User.findById(id).exec().then(val => {
      if (!val) {
        reject({error: `No user with id ${id} has been found.`});
      }
      resolve(val);
    })
    .catch((err) => {reject(err)});
  });
}

var User = mongoose.model('User', userSchema);

module.exports = User;
