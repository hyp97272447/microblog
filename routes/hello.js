var express = require('express');
var router = express.Router();
var users = {
	'byvoid':{
		name:'Carbo',
		website:'http://www.byvoid.com'
	}
};
router.all('/:username',function(req,res,next){
	if(users[req.params.username]){
		console.log('用户存在');
		next();
	}else{
		next(new Error(req.params.username + ' Don\'t exists!'));
	}
});
router.get('/:username',function(req,res,next){
	console.log(req.params.username);
	// JSON stringify处报错
	// res.send(JSON.stringify(users[req.params.username]));
	next();
})

/* GET home page. */
router.get('/:username', function(req, res, next) {
  // res.render('hello', { name: req.params.username });
  res.send('Done!');
  // res.render('index', { title: 'Express' });
});

module.exports = router;
