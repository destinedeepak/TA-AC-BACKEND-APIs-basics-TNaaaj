var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var bookRouterv1 = require('./routes/bookv1');
var bookRouterv2 = require('./routes/bookv2');
var commentRouterv2 = require('./routes/commentv2');

// db connection 
mongoose.connect('mongodb://localhost/bookStoreDB',
{useNewUrlParser:true, useUnifiedTopology: true},
(err)=> console.log(err ? err : 'Database is connected!'))

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/book', bookRouterv1);
app.use('/api/v2/book', bookRouterv2);
app.use('/api/v2/comment', commentRouterv2)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
