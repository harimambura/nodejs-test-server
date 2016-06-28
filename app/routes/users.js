const express = require('express');
const router = express.Router();
const user = require('../models/User');

router.route('/:username')
.get((req, res)=>{
  console.log(req.params);
  user.findUser({username: req.params.username}, req.handler);
})
.put((req, res)=>{
  console.log(req.body);
  var dataObj = {
    'username': req.params.username,
    'password': req.body.password || undefined,
    'email': req.body.email || undefined,
  }
  user.editUser(dataObj, req.handler);
})
.delete((req, res)=>{
  console.log(req.params);
  user.deleteUser({username: req.params.username}, req.handler);
});

router.post('/', (req, res)=>{
  console.log(req.body);
  user.addUser(req.body, req.handler /*callback*/);
});

router.get('/:username/comments', (req, res)=>{
  console.log(req.body, req.params);
  user.getUserComments({username: req.params.username}, req.handler /*callback*/);
});

router.get('/:username/articles', (req, res)=>{
  console.log(req.body, req.params);
  user.getUserArticles({username: req.params.username}, req.handler /*callback*/);
});















module.exports = router;
