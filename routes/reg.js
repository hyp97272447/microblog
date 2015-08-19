var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user');

// 注册之前首先判断未登录，若已登录，则跳转到主页
router.get('/',checkNotLogin);
// 若未登录，则跳转到登录页面
router.get('/',function(req,res,next){
	res.render('reg',{title:'用户注册'})
});
router.post('/',checkNotLogin);
router.post('/',function(req,res,next){
	if(req.body['password-repeat'] != req.body['password']){
		console.log('两次输入的口令不一致');
		req.flash('error','两次输入的口令不一致');
		return res.redirect('/reg');
	}
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('base64');

	var newUser = new User({
		name:req.body.username,
		password:password,
	});

	User.get(newUser.name,function(err,user){
		if(user){
			err = 'Username already exists.';
		}
		if(err){
			req.flash('error',err);
			return res.redirect('/reg');
		}
		newUser.save(function(err){
			console.log('save err ' + err);
			if(err){
				req.flash('error',err);
				return res.redirect('/reg');
			}
			req.session.user = newUser;
			req.flash('success','注册成功');
			return res.redirect('/');
		})
	})

});
function checkNotLogin(req,res,next){
	if(req.session.user){
		req.flash('error','已登录');
		res.redirect('/');
	}
	next();
}
module.exports = router;