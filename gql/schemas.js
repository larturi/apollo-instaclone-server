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

   ##### Querys #####
   type Query {
      # User
      getUser(id: ID, username: String): User
   }

   ##### Mutations #####
   type Mutation {
      # User
      registerUser(input: UserInput): User
      loginUser(input: LoginInput): Token
      updateAvatar(file: Upload): UpdateAvatar
   }
`;

module.exports = typeDefs;
