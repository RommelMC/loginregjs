var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt'); 

module.exports = {
  index: function(req, res) {
    var errs = req.session.errors;
    delete req.session.errors;
    var exists = req.session.checklogin;
    delete req.session.checklogin;
    console.log(errs);
    res.render('index', {errors: errs, exists: exists});
  },
  register: function(req, res){
      var user = new User({email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName, password: req.body.password, birthday: req.body.birthday});
      user.save(function(err){
          if(err){
            console.log('error1');
            // console.log(err);
            req.session.errors = err;
            res.redirect('/');
          }
          else{
              console.log('success');
              res.redirect('/');
          }
      })
  },
  login: function(req, res){
      User.findOne({email:req.body.email}, function(err, user){
          if(err)
            console.log('error')
          else{
              if(user == null){
                  console.log('JSNDFLKAJNDFKANJ');
                  req.session.checklogin = false;
                  res.redirect('/');
              }
              else{
                if(bcrypt.compareSync(req.body.password, user.password)){
                    req.session.curr = user;
                    res.redirect('/success');
                }
                else{
                    req.session.checklogin = false;
                    res.redirect('/');
                }
            }
        }
      })
  },
  success: function(req, res){
      res.render('success', {user: req.session.curr});
  }
}
