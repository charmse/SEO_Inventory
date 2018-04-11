var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "cse.unl.edu",
  user: "tsim",
  password: "60619312",
});

/* GET home page. */
router.get('/', function(req, res, next) {
res.render('login.html', function(err, login) {
  res.send(login);
});
});

/* process login form */
router.post('/login', function(req, res, next) {
var email = req.body.email;
var pw = req.body.pw;
console.log("post received: %s %s", email, pw);
var realPassword ;
var sql = "select passwd from  sim.User where email = '"+ email +"'";
con.query(sql,function(err,result){
if(result.length>0){
realPassword = result[0].passwd;
}
console.log(realPassword);
if(realPassword==pw){
  console.log("realP = pw ");
  res.render('home.html', function(err, home) {
  res.send(home);
  });
}
else{
  res.redirect(req.get('referer'));
}
});
});


function userExist(email){
  sql = "select email from jngu.User where email ='" + email + "'";
    con.query(sql,function(err,result){
      console.log(result.length);
    if(result.length>0){
      console.log(result);
      return true;
    }
    else{
      return false;
    }
  });
  }
  
/* process registration form  */
router.post('/signup', function(req, res, next) {

// extract the parameters (mail and pw) obtained from login form
var email1 = req.body.email1;
var pw1 = req.body.pw1;
var pw2 = req.body.pw2;
console.log("post received: %s %s %s", email1, pw1, pw2); 
if(userExist(email1) == false){
  console.log("inside");
  var sql = " insert into jngu.User (email,passwd) values ('" +email1 + "','" + pw1 + "')";
  con.query(sql);
  res.render('login.html', function(err, login) {
    res.send(login);
    });
}
else{
  res.render('login.html', function(err, login) {
    res.send(login);
    });
}

});


router.post('/addItem',function(req,res,next){
  console.log("function called");
  var itemName = req.body.itemName;
  var itemStatus = req.body.itemStatus;
  var price = req.body.price;
  var quantity = req.body.quantity;
  var supplier = req.body.supplier;
  var category = req.body.category;
  var sql = "insert into tsim.Item (categoryId,itemName,qty,price,itemStatus,supplier,category) values ('2','smartphone',7,'899','1','Sony','Electronics')";
    // var sql = "INSERT INTO jngu.Item (itemName,qty,price,itemStatus,supplier,category) values('" +
  //  itemName + "','" + quantity + "','"  + price + "','"  + itemStatus + "','" +supplier+ "','" + category+"')";
  console.log("test:" + itemName);
  con.query(sql, function (err, result) {
    // res.json(rows);
    if(err) throw err;
    con.on('error', function(err) {
      console.log("[mysql error]",err);
    });
    });
res.render('home.html', function(err, home) {
  console.log('return to home page');
	res.send(home);
});
});

router.post('/addCategory',function(req,res,next){
  console.log("add catgy");
  var CategoryName = req.body.catgyName;
  console.log(CategoryName);
  res.render('home.html', function(err, home) {
    console.log('return to home page');
    res.send(home);
  });
});

router.post('/editItem',function(req,res,next){
  console.log("edit Item");
  var itemName = req.body.itemName;
  var itemStatus = req.body.itemStatus;
  var price = req.body.price;
  var quantity = req.body.quantity;
  var supplier = req.body.supplier;
  var category = req.body.category;
  console.log(itemName);
  res.render('home.html', function(err, home) {
    console.log('return to home page');
    res.send(home);
});
});
router.post('/editCategory',function(req,res,next){
  console.log("edit catgy");
  var CategoryName = req.body.newCatgyN;
  console.log(CategoryName);
  res.render('home.html', function(err, home) {
    console.log('return to home page');
    res.send(home);
  });
});



module.exports = router;



