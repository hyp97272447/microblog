var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var util = require('util');
var routes = require('./routes/index');
var settings = require('./settings');
var flash = require('connect-flash');
// var users = require('./routes/users');
// var hello = require('./routes/hello');
// connect创建session
var connect = require('connect')
var app = express();
var mysql = require('mysql');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var reg = require('./routes/reg');
var login = require('./routes/login');

// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '123456'
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//注册使用flash
app.use(flash());
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({  
  resave: true,
  saveUninitialized: true,
  secret: 'microblogbyvoid', 
  key: 'microblogbyvoid' ,
  cookie: { maxAge: 20000}
}));  
app.use(express.static(path.join(__dirname, 'public')));
app.use('/',function(req, res, next){
  console.log("app.usr local");
  res.locals.user = req.session.user;
  res.locals.post = req.session.post;
  var error = req.flash('error');
  console.log(error)

  res.locals.error = error.length ? error : null;
  var success = req.flash('success');
  console.log(success)
  res.locals.success = success.length ? success : null;
  next();
 });
app.use('/', routes);
app.use('/reg',reg);
app.use('/login',login);
app.get('/logout',checkLogin);
app.get('/logout',function(req,res,next){
  req.session.user = null;
  console.log('登出成功！');
  res.redirect('/');
})
function checkLogin(req,res,next){
  console.log('req.session.user ' + req.session.user);
  if(!req.session.user){
    req.flash('error','未登录');
    res.locals.user = null;
    req.flash('user','');
    return res.redirect('/login');
  }
  next();
}
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret:settings.cookieSecret,
    store:new MongoStore({
      db:settings.db
    })  
}));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
module.exports = app;
// app.get('/',function(req,res,next){
//   console.log(123456);
//   connection.connect();

//   connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//     if (err) throw err;
//     console.log('The solution is: ', rows[0].solution);
//   });

//   connection.end();
//   console.log(789);
//   res.end();
// })
// app.use('/users', users);
// app.use('/hello',hello);
// app.use('/u/:user',user);
// app.use('/post',post);

// app.use('/reg',doReg);
// app.use('/login',login);
// app.use('/login',doLogin);
// app.use('/logout',logout);
// app.use(session({
//   secret:settings.cookieSecret,
//   store:new MongoStore({
//     db:settings.db
//   })
// }));

// app.dynamicHelpers({
//   user:function(req,res){
//     return req.session.user;
//   },
//   error:function(req,res){
//     var err = req.flash('error');
//     if(err.length){
//       return err;
//     }else return null;
//   },success:function(req,res){
//     var succ = req.flash('success');
//     if(succ.length) return succ;
//     else return null;
//   }
// });

// app.helpers({inspect:function(obj){
//   return util.inspect(obj,true)
// }});
// app.dynamicHelpers({
//   headers:function(req,res){
//     return req.headers;
//   }
// });
// app.get('/helper',function(req,res){
//   res.render('helper',{title:'Helpers'})
// });

