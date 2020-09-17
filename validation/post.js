const Validator = require('validator');
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';


  if(!Validator.isLength(data.text,{min:10,max:300})){
    errors.text = "Comment cannot less than 10 or more than 300 char!";
  }

  if(Validator.isEmpty(data.text)){
    errors.text = "Text cannot be null!";
  }

  return {
    errors,
    isValid:isEmpty(errors)
  };
}