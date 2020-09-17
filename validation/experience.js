const Validator = require('validator');
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';



  if(Validator.isEmpty(data.title)){
    errors.title = "Personal experience's title cannot be null!";
  }

  if(Validator.isEmpty(data.company)){
    errors.company = "Personal experience's company cannot be null!";
  }

  if(Validator.isEmpty(data.from)){
    errors.from = "Personal experienece's from cannot be null!";
  }



  return {
    errors,
    isValid:isEmpty(errors)
  };
}