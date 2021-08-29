const { gql } = require('apollo-server');

const typeDefs = gql`
   ##### Types #####
   type User {
      id: ID
      name: String
      username: String!
      email: String!
      password: String!
      avatar: String
      siteWeb: String
      bio: String
      createdAt: String
   }
   type Token {
      token: String!
   }
   type UpdateAvatar {
      status: Boolean!
      urlAvatar: String
   }
   type Publish {
      status: Boolean
      urlFile: String
   }
   type Publication {
      id: ID
      idUser: ID
      file: String
      typeFile: String
      createAt: String
   }
   type Comment {
      idUser: User
      idPublication: ID
      comment: String
      createAt: String
   }

   ##### Inputs #####
   input UserInput {
      name: String!
      username: String!
      email: String!
      password: String!
   }
   input LoginInput {
      email: String!
      password: String!
   }
   input UserUpdateInput {
      name: String
      email: String
      currentPassword: String
      newPassword: String
      siteWeb: String
      bio: String
   }
   input CommentInput {
      idPublication: ID
      comment: String
   }

   ##### Querys #####
   type Query {
      # User
      getUser(id: ID, username: String): User
      search(query: String): [User]

      # Follow
      isFollow(username: String!): Boolean
      getFollowers(username: String!): [User]
      getFolloweds(username: String!): [User]

      # Publication
      getPublications(username: String!): [Publication]

      # Comment
      getComments(idPublication: ID!): [Comment]
   }

   ##### Mutations #####
   type Mutation {
      # User
      registerUser(input: UserInput): User
      loginUser(input: LoginInput): Token
      updateAvatar(file: Upload): UpdateAvatar
      deleteAvatar: Boolean
      updateUser(input: UserUpdateInput): Boolean

      # Follow
      follow(username: String!): Boolean
      unFollow(username: String!): Boolean

      # Publication
      publish(file: Upload): Publish

      # Comment
      addComment(input: CommentInput): Comment

      # Like
      addLike(idPublication: ID!): Boolean
      deleteLike(idPublication: ID!): Boolean
   }
`;

module.exports = typeDefs;
