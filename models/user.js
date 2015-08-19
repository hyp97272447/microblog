var mongodb =require('./db');
function User(user){
	this.name = user.name;
	this.password = user.password;
}
module.exports = User;
User.prototype.save =function save(callback){
	var user = {
		name:this.name,
		password:this.password
	};
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}
		db.collection('user',function(err,collection){
			console.log('collection  ' + collection);
			if(err){
				mongodb.close();
				return callback(err);
			}
			// 为name属性添加索引
			collection.ensureIndex('name',{unique:true});
			collection.insert(user,{safe:true},function(err,userd){
				console.log('userId ' + userd);
				mongodb.close();
				callback(err,userd);
			})
		});
		// console.log('users ' + db.collection('users'));
	});
}
User.get = function get(username,callback){
	mongodb.open(function(err,db){
		console.log('username =>' + username);
		if(err) return callback(err);
		db.collection('user',function(err,collection){
			if(err) {
				mongodb.close();
				return callback(err);
			}
			collection.findOne({name:username},function(err,doc){
				console.log('doc ' + doc);
				mongodb.close();
				if(doc){
					var user = new User(doc);
					callback(err,user);
				}else{
					callback(err,null);
				}
		})
		})
		
	})
}