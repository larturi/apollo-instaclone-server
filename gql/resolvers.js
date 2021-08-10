const userController = require('../controllers/userController');

const resolvers = {
   Query: {
      // User
      getUser: (_, { id, username }) => userController.getUser(id, username),
   },
   Mutation: {
      // User
      registerUser: (_, { input }) => userController.register(input),
      loginUser: (_, { input }) => userController.login(input),
      updateAvatar: (_, { file }, ctx) =>
         userController.updateAvatar(file, ctx),
   },
};

module.exports = resolvers;
