import { typeDefs as User } from '../users/';

const Dashboard = `
  type IDObject {
    _id: String
  }
  type Dashboard {
    id: String!
    name: String!
    users: [User]
  }
  extend type Query {
    dashboards: [Dashboard]
  }
  extend type Mutation {
    submitDashboard(name: String!): Dashboard
  }
  extend type Mutation {
    copyDashboard(id: String!): Dashboard
  }
  extend type Mutation {
    renameDashboard(id: String!, name: String!): Dashboard
  }
  extend type Mutation {
    deleteDashboard(id: String!): IDObject
  }
`;

export default () => [Dashboard];
