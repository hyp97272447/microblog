var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user');

router.get('/',checkNotLogin);
router.get('/',function(req,res,next){
	res.render('login',{title:'用户登录',
            success : req.flash('success').toString(),
            error : req.flash('error').toString()})
});
router.post('/',checkNotLogin);
router.post('/',function(req,res,next){
	console.log('POST');
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('base64');
	User.get(req.body.username,function(err,user){
		console.log("user " + user  + "   And Err " + err );
		if(!user){
			return res.redirect('/login');
		}
		if(user.password == password){
			req.session.user=user;
			console.log('登录成功');
			console.log('req.session.user ' + req.session.user.name);
			return res.redirect('/');
		}
		res.redirect('/login');
	})
});

function checkNotLogin(req,res,next){
	if(req.session.user){
		req.flash('error','已登录');
		return res.redirect('/');	
	}
	next();
}
module.exports = router;