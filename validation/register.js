const Validator = require('validator');
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if(!Validator.isLength(data.name,{min:2,max:30})){
    errors.name = "Length of name cannot less than 2 and more than 30 degree!";
  }

  if(Validator.isEmpty(data.name)){
    errors.name = "Name cannot be null!";
  }

  if(Validator.isEmpty(data.email)){
    errors.email = "Email cannot be null!";
  }

  if(!Validator.isEmail(data.email)){
    errors.email = "Email is invalid!";
  }

  if(Validator.isEmpty(data.password)){
    errors.password = "Password cannot be null!";
  }

  if(!Validator.isLength(data.password,{min:6,max:30})){
    errors.password = "Length of password cannot less than 6 and more than 30 degrees!";
  }

  if(Validator.isEmpty(data.password2)){
    errors.password2 = "Confirm password cannot be null!";
  }

  if(!Validator.equals(data.password,data.password2)){
    errors.password2 = "Second Password is not same!";
  }



  return {
    errors,
    isValid:isEmpty(errors)
  };
}