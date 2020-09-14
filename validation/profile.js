const Validator = require('validator');
const isEmpty = require("./is-empty");

module.exports = function validateProfileInptu(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';

  if(!Validator.isLength(data.handle,{min:2,max:40})){
    errors.handle = "Username's length cannot less than 2 or more than 40 degrees!";
  }

  if(!Validator.isEmpty(data.handle)){
    errors.handle = "handle cannot be null!";
  }

  if(!Validator.isEmpty(data.status)){
    errors.status = "status cannot be null!";
  }

  if(!Validator.isEmpty(data.skills)){
    errors.skills = "skills cannno be null!";
  }

  if(!isEmpty(data.website)){
    if(!Validator.isURL(data.website)){
      errors.website = "url is illegal!";
    }
  }

  if(!isEmpty(data.tengxunkt)){
    if(!Validator.isURL(data.tengxunkt)){
      errors.tengxunkt = "url is illegal!";
    }
  }

  if(!isEmpty(data.wangyikt)){
    if(!Validator.isURL(data.wangyikt)){
      errors.wangyikt = "url is illegal!";
    }
  }

  return {
    errors,
    isValid:isEmpty(errors)
  }
}