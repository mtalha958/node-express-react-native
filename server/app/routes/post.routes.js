module.exports = (app) => {
  const { index, update, show, create, deletePost } = require('../controllers/post.controller.js');

  // Create a new Post
  app.post('/post', create);

  // Retrieve all Posts
  app.get('/posts', index);

  // Retrieve a single Post with postId
  app.get('/posts/:postId', show);

  // Update a Post with postId
  app.put('/posts/:postId', update);

  // Delete a Post with postId
  app.delete('/posts/:postId', deletePost);
}
