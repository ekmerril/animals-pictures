const { ApolloServer } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");

const { typeDefs } = require("./src/schema/animal-pictures.js");
const { resolvers } = require("./src/resolvers/animal-pictures.js");

const server = new ApolloServer({
  schema: buildSubgraphSchema([
    {
      typeDefs,
      resolvers,
    },
  ]),
});

server.listen({ port: 4003 }).then(({ url }) => {
  console.log("Animal Picture service ready at " + url);
});
