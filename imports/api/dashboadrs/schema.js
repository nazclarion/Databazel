import { typeDefs as User } from '../users/';

const Dashboard = `
  type Dashboard {
    id: String!
    name: String!
    users: [User]
  }
`;

export default () => [Dashboard];
