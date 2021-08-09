const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./gql/schemas');
const resolvers = require('./gql/resolvers');
require('dotenv').config({ path: '.env' });

mongoose.connect(
   process.env.BD,
   {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
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
   });

   serverApollo.listen({ port: 4001 }).then(({ url }) => {
      console.log(`Apollo Server is now running in ${url}`);
   });
}
