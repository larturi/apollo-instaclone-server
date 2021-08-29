const userController = require('../controllers/userController');
const followController = require('../controllers/followController');
const publicationController = require('../controllers/publicationController');
const commentController = require('../controllers/commentController');
const likeController = require('../controllers/likeController');

const resolvers = {
   Query: {
      // User
      getUser: (_, { id, username }) => userController.getUser(id, username),
      search: (_, { query }) => userController.search(query),

      // Follow
      isFollow: (_, { username }, ctx) =>
         followController.isFollow(username, ctx),
      getFollowers: (_, { username }) =>
         followController.getFollowers(username),
      getFolloweds: (_, { username }) =>
         followController.getFolloweds(username),

      // Publication
      getPublications: (_, { username }) =>
         publicationController.getPublications(username),

      // Comment
      getComments: (_, { idPublication }) =>
         commentController.getComments(idPublication),

      // Like
      isLike: (_, { idPublication }, ctx) =>
         likeController.isLike(idPublication, ctx),
   },
   Mutation: {
      // User
      registerUser: (_, { input }) => userController.register(input),
      loginUser: (_, { input }) => userController.login(input),
      updateAvatar: (_, { file }, ctx) =>
         userController.updateAvatar(file, ctx),
      deleteAvatar: (_, {}, ctx) => userController.deleteAvatar(ctx),
      updateUser: (_, { input }, ctx) => userController.updateUser(input, ctx),

      // Follow
      follow: (_, { username }, ctx) => followController.follow(username, ctx),
      unFollow: (_, { username }, ctx) =>
         followController.unFollow(username, ctx),

      // Publication
      publish: (_, { file }, ctx) => publicationController.publish(file, ctx),

      // Comment
      addComment: (_, { input }, ctx) =>
         commentController.addComment(input, ctx),

      // Like
      addLike: (_, { idPublication }, ctx) =>
         likeController.addLike(idPublication, ctx),
      deleteLike: (_, { idPublication }, ctx) =>
         likeController.deleteLike(idPublication, ctx),
   },
};

module.exports = resolvers;
