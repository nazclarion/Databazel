import { typeDefs as User } from '../users/';

const Dashboard = `
  type Dashboard {
    id: String!
    name: String!
    users: [User]
  }
  extend type Query {
    dashboards: [Dashboard]
  }
  extend type Mutation {
    submitDashboard(name: String): Dashboard
  }
`;

export default () => [Dashboard];
