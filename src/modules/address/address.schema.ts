import { gql } from "apollo-server-express";
import { type } from "os";

export default gql`
  extend type Query {
    getProvince: [Province]
    getDistrict(provinceId: ID!): [District]
    getWard(districtId: ID!): [Ward]
  }

  type Province {
    id: ID!
    name: String
  }
  type District {
    id: ID!
    name: String
  }
  type Ward {
    id: ID!
    name: String
  }
`;
