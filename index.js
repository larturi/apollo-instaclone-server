const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');
const typeDefs = require('./gql/schemas');
const resolvers = require('./gql/resolvers');
require('dotenv').config({ path: '.env' });

mongoose.connect(
   process.env.BD,
   {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
   },
   (err, _) => {
      if (err) {
         console.log('Error al intentar conectar a la BD');
      } else {
         server();
      }
   }
);

function server() {
   const serverApollo = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => {
         const token = req.headers.authorization;

         if (token) {
            try {
               const user = jwt.verify(
                  token.replace('Bearer ', ''),
                  process.env.SECRET_KEY
               );
               return {
                  user,
               };
            } catch (error) {
               console.error('### ERROR ###');
               console.error(error);
               throw new Error('Token no valido');
            }
         }
      },
   });

   serverApollo.listen({ port: 4001 }).then(({ url }) => {
      console.log(`Apollo Server is now running in ${url}`);
   });
}
