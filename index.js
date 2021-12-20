const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");
const { join } = require('path')
const { loadDocumentsSync }  = require( '@graphql-tools/load')
const { GraphQLFileLoader }  = require( '@graphql-tools/graphql-file-loader')
const { addResolversToSchema }  = require( '@graphql-tools/schema')

// TODO: why does this have to be named explicitly 'schema' for this all to work???!!!
// const animalSchema = loadSchemaSync(join(__dirname, './src/schema/animal-pictures.gql'), {
//   loaders: [new GraphQLFileLoader()]
// })



const typeDefs = gql`
  extend type Animal @key(fields: "selectedAnimal") {
    selectedAnimal: String @external
    picture: Picture
}

type Picture {
    url: String
}

`;




const resolvers = require('./src/resolvers/animal-pictures.js')
// const schemaWithResolvers = addResolversToSchema({
//   schema: animalSchema,
//   resolvers: animalResolvers
// })

// console.log(schemaWithResolvers)
// const server = new ApolloServer({ schema: schemaWithResolvers});

console.log(typeDefs)
console.log(resolvers)
const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers
    }
  ])
});

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

// const { ApolloServer, gql } = require("apollo-server");
// const { buildFederatedSchema } = require("@apollo/federation");

// const typeDefs = gql`
// extend type Animal @key(fields: "id") {
//     id: ID! @external
//     commonName: String @external
//     class: String @external
//     habitats: [String] @external
//     countries: [String] @external
//     foods: [String] @external
//     picture: Picture
// }

// type Picture {
//     filename: String!
//     url: String!
// }
// `;

// const resolvers = {
//   Animal: {
//     __resolveReference(object) {
//       return {
//         ...object,
//         ...inventory.find(product => product.upc === object.upc)
//       };
//     }
//   }
// };

// const server = new ApolloServer({
//   schema: buildFederatedSchema([
//     {
//       typeDefs,
//       resolvers
//     }
//   ])
// });

// server.listen({ port: 4003 }).then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`);
// });

// const products = [
//   {
//     upc: "1",
//     name: "Table",
//     price: 899,
//     weight: 100
//   },
//   {
//     upc: "2",
//     name: "Couch",
//     price: 1299,
//     weight: 1000
//   },
//   {
//     upc: "3",
//     name: "Chair",
//     price: 54,
//     weight: 50
//   }
// ];