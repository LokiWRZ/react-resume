const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../../models/Post");
const Profile = require("../../models/Profiles");

const validatePostInput = require("../../validation/post");


// $route  GET api/posts/test
// @desc   returned required json data
// @access public
router.get("/test",(req, res) => {
  res.json({msg:"posts works"})
})

// $route  POST api/posts
// @desc   Create an interface for comment
// @access Private
router.post("/",passport.authenticate('jwt', { session: false }),(req, res) => {
  const {errors, isValid} = validatePostInput(req.body);

  // judge whether isValid is passed
  if(!isValid){
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.body.id
  });
  
  newPost.save().then(post => res.json(post));
})

// $route  GET api/posts/:id
// @desc   Get single comment info
// @access public
router.get("/:id",(req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({nopostsfound:"Cannot find this comment"}))
})

// $route  DELETE api/posts/:id
// @desc   Delete single comment
// @access Private
router.delete("/:id",passport.authenticate('jwt', { session: false }),(req, res) => {
  Profile.findOne({user:req.user.id}).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        // judge whether is self
        if(post.user.toString() !== req.user.id) {
          return res.status(401).json({notauthorized:"User's illegal operation!"})
        }

        post.remove().then(() => res.json({siccess:true}))
      })
      .catch(err => res.status(404).json({postnotfound:"No info about this comment"}))
  })
})

// $route  POST api/posts/lile/:id
// @desc   like interface
// @access Private
router.post("/like/:id",passport.authenticate('jwt', { session: false }), (req,res) => {
  Profile.findOne({user:req.user.id}).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
          return res.status(400).json({alreadyliked:"This user has liked"})
        }

        post.likes.unshift({user:req.user.id})

        post.save().then(post => res.json(post))
      })
      .catch(err => res.status(404).json({likederror:"Like error"}))
  })
})

// $route  POST api/posts/unlike/:id
// @desc   cancel like interace
// @access Private
router.post("/unlike/:id",passport.authenticate('jwt', { session: false }),(req,res) => {
  Profile.findOne({user:req.user.id}).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
          return res.status(400).json({notliked:"This user hasn't liked"})
        }

        // get the user id which you want to delete
        const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        post.save().then(post => res.json(post))
      })
      .catch(err => res.status(404).json({likederror:"cancel like error"}))
  })
})

// $route  POST api/posts/comment/:id
// @desc   Add comment interface
// @access Private
router.post("/comment/:id",passport.authenticate('jwt', { session: false}), (req, res) => {
  const {errors, isValid} = validatePostInput(req.body);

  // Judge whether isValid is passed
  if(!isValid){
    return res.status(400).json(errors);
  }

  Post.findById(req.params.id)
    .then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      }

      post.comments.unshift(newComment);

      // save
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({postnotfound:"Add comment error"}))
})

// $route  DELETE api/posts/comment/:id
// @desc   Delete comment interface
// @access Private
router.delete("/comment/:id/:comment_id", passport.authenticate('jwt', { session: false }), (req,res) => {

  Post.findById(req.params.id)
    .then(post => {
      if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0){
        return res.status(404).json({commentnotexists:"This comment is not existed"})
      }

      // find the index of this comments
      const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);

      post.comments.splice(removeIndex,1);

      // save
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({postnotfound:"Delete comments error"}))
})

module.exports = router;
