// require mongoose
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
// create the schema
var UserSchema = new mongoose.Schema({
  email: {unique: true, type: String, required: true, validate:{
      validator: function(value){
          return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
      },
      message: "Invalid email"
  }},
  firstName: {type: String, required: true, minlength: 2},
  lastName: {type: String, required: true, minlength: 2},
  password: {type: String, required: true, minlength: 8, validate:{
    validator: function( value ) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test( value );
      },
      message: "Password failed validation, you must have at least 1 number, uppercase and special character"
  }},
  birthday: {type: Date, required: true, validate:{
      validator: function(value){
          return value < new Date();
      },
      message: "Date is in the future"
  }}
},{timestamp: true})
// register the schema as a model

UserSchema.pre('save', function(done){
    this.password=bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
    done();
})

var User = mongoose.model('User', UserSchema);