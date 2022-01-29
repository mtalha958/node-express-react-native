const Post = require('../models/post.model.js');

// Create and Save a new Post
const create = (req, res) => {
  // Validate request
  if(!req.body.content) {
    return res.status(400).send({
      message: "Post content can not be empty"
    });
  }

  // Create a Post
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content
  });

  // Save Post in the database
  newPost.save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Post."
      });
    });
}

// Retrieve and return all posts from the database.
const index = (_, res) => {
  Post.find()
    .then((posts) => { res.send(posts) })
    .catch((err) => { res.status(500).send({ message: err.message || "Some error occurred while fetching posts." }) });
};

// Find a single post with a postId
const show = (req, res) => {
  Post.findById(req.params.postId)
    .then((post) => {
      if (!post) {
        return res.status(404).send({
          message: "Post not found with id " + req.params.postId
        });
      }

      return res.send(post);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Post not found with id " + req.params.postId
        });
      }

      return res.status(500).send({ message: err.message || 'Some error occurred while fetching post'});
    })
};

// Update a post identified by the postId in the request
const update = (req, res) => {
  // Validate Request
  if(!req.body.content) {
    return res.status(400).send({
        message: "Post content can not be empty"
    });
  }

  const tmpUpdatedPost = {
    title: req.body.title,
    content: req.body.content
  }

  // Find post and update it with the request body
  Post.findByIdAndUpdate(req.params.postId, tmpUpdatedPost, {new: true})
    .then((post) => {
      if(!post) {
        return res.status(404).send({
          message: "Post not found with id " + req.params.postId
        });
      }

      return res.send(post);
    }).catch((err) => {
      if(err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Post not found with id " + req.params.postId
        });
      }

      return res.status(500).send({
          message: "Error updating post with id " + req.params.postId
      });
    });
};

// Delete a post with the specified postId in the request
const deletePost = (req, res) => {
  Post.findByIdAndRemove(req.params.postId)
    .then((post) => {
      if (!post) {
        return res.status(404).send({
          message: "Post not found with id " + req.params.postId
        });
      }

      return res.send({message: "Deleted successfully!"});
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Post not found with id " + req.params.postId
        });
      }

      return res.status(500).send({ message: "Could not delete note with id " + req.params.noteId });
  });
};

module.exports = {
  index, update, show, create, deletePost
}
