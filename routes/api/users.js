// login & register
const express =require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const keys = require("../../config/keys");
const passport = require("passport");

const User = require("../../models/User");

// use valid function 
const validateRegisterInput = require("../../validation/register");
const validateLoginInptut = require("../../validation/login");

// $route GET api/users/test
// @desc returned required json data
// @access public
router.get("/text", (req,res) => {
  res.json({ msg: "login works" })
})

// $route POST api/users/register
// @desc returned required json data
// @access public
router.post("/register", (req,res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // judge whether isValid passed
  if(!isValid) {
    return res.status(400).json(errors);
  }

  // check whether have email in database
  User.findOne({ email: req.body.email })
    .then((user) =>{
      if(user) {
        return res.status(400),json({ email: "Email has been registered!" })
      } else {
        const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d:'mm'});

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        })

        bcrypt.genSalt(10, function (err,salt) {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;

            newUser.password = hash;

            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    })
})

// &route POST api/users/login
// @desc  return token jwt passport
// @access public

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // judge whether isValid is passed
  if(!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  // check database
  User.findOne({ email })
    .then(user => {
      if(!user) {
        return res.status(404).json({ email: "User is not existed!"});
      }

      // password matching
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch) {
            const rule = { id: user.id, name: user.name, avatar: user.avatar };
            jwt.sign(rule, keys.secretOrKey, { exporesIn: 3600 }, (err, token) => {
              if(err) throw err;
              res.json({
                success: true,
                token: "Bearer " + token
              });
            })
            // res.json({msg:"success"});
          } else {
            return res.status(400).json({ password: "Password is incorrect!"});
          }
        })
    })
})

// $route GET api/users/current
// @desc return current user
// @access Private
router.get("/current", passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
})

module.exports = router;