const express = require('express'),
      app = express(),
      //routes = require('./app/routes'),
      //router = express.Router(),
      mongoose = require('mongoose');
      userRouter = require('./app/routes/users'),
      articleRouter = require('./app/routes/articles'),
      bodyParser    = require('body-parser');
var morgan = require('morgan');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(function(req, res, next){
  req.handler = (err, dataObj) => {
    console.log(err || dataObj);
    res.status(err ? 400 : 200).send(err || dataObj);
  };

  next();
});

//API routes

app.use('/users', userRouter);
app.use('/articles', articleRouter);

// comments just for test
app.use('/comments', require('./app/routes/comments'));

app.get('/about', function (req, res) {
    console.log(req.path);
    res.send('About page');
});

app.use('/', express.static('./public'));

app.use(function(req, res, next){
  console.log('404', 'not found, path:', req.path);
  res.status(404);
  res.sendFile(__dirname+'/public/404.html');
  return;
});

app.use(function(err, req, res, next){
  res.status(err.status || 500);
  console.log(`Internal error(${res.statusCode}): ${err.message}`);
  res.send({ error: err.message });
  return;
});
 var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/heroku_4x7dl8kf';
//mongoose.connect( process.env.MONGODB_URI);//('mongodb://heroku_4x7dl8kf:test123@ds019654.mlab.com:19654/heroku_4x7dl8kf');

app.listen(Number(process.env.PORT || 3000), function() {
  console.log("Server is listening on port", Number(process.env.PORT || 3000));
});
