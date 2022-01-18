const { gql } = require("apollo-server");

const animalTypeDefs = gql`
  extend type Animal @key(fields: "ID") {
    ID: String @external
    pictures: [Picture]
  }

  type Picture {
    url: String
  }
`;

module.exports.typeDefs = animalTypeDefs;
