const express = require('express');
const router = express.Router();
const comment = require('../models/Comment');

router.route('/:id')
.get((req, res)=>{
  console.log(req.params);
  comment.findById(req.params.id, (err, item) => {
    req.handler(err || null, item);
  });
})
.put((req, res)=>{
  console.log(req.body);
  req.body['_id'] = req.params.id;
  comment.updateComment(req.body)
  .then(data => req.handler(null,data), err => req.handler(err));
})
.delete((req, res)=>{
  console.log(req.params);
  comment.deleteComment(req.params.id)
  .then(data => req.handler(null,data), err => req.handler(err));
});

router.post('/', (req, res)=>{
  console.log(req.body);
  comment.addComment(req.body)
  .then(data => req.handler(null,data), err => req.handler(err));
});

router.get('/', (req, res)=>{
  console.log(req.body);
  comment.find((err, items) => {
    req.handler(err || null, items);
  });
});

module.exports = router;
