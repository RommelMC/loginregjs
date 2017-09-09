var persons = require('../controllers/users.js');
module.exports = function(app) {
  app.get('/', function(req, res) {
    persons.index(req, res);
  })
  app.post('/register', function(req, res){
    persons.register(req, res);
  })
  app.post('/login', function(req, res){
      persons.login(req, res);
  })
  app.get('/success', function(req, res){
      persons.success(req, res);
  })
}
