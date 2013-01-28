
/*
 * GET users listing.
 */
var mongoose = require('mongoose');

var schema = mongoose.Schema({name: String,
	color: String,
	age: Number
	});

var Cat = mongoose.model('Cat', schema);


exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.newCat = function(req, res){
  var names = new Array("Precious", "Sweetheart", "Jack", "Casper");
  var colors = new Array("white", "black", "grey", "tabby");
  var cat_age = Math.floor(Math.random()*10);
  var cat_name = names[Math.floor(Math.random()*names.length)];
  var cat_color = colors[Math.floor(Math.random()*colors.length)];
  console.log(cat_age + " " + cat_name + " " + cat_color);
  
  new_Cat = new Cat({name: cat_name, age:cat_age, color: cat_color});
  new_Cat.save(function(err){
  		if (err)
			return console.log("error", err);
		console.log('saving');
  });
	
  res.send("Your cat's name is " + cat_name + ", is age " + cat_age +
  	", and is " + cat_color + " in color.");

};

exports.listCats = function(req, res){
	Cat.find().sort('age').exec(function(err, list_cats){
		if (err) {
			return console.log("error", err);
		}
		res.render('cats',{cats: list_cats});
	});
};

exports.findColor = function(req,res){
	console.log(req.params.color);
	Cat.find({'color':req.params.color}).sort('age').exec(function(err, list_cats){
		if(err){
			console.log(err);
		}
		res.render('cats', {cats:list_cats});
	});
};

exports.removeOldest = function(req,res){
	Cat.find().sort('-age').exec(function(err, list_cats){
		if (err){
			console.log(err);
		}
		list_cats[0].remove();
		res.render('cats',{cats:list_cats});
	})
};
/*
GET /cats/delete/old => deletes the oldest cat :c The cat should no longer appear on any lists
*/