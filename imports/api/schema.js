import { typeDefs as usersTypeDefs} from './users/';
import { typeDefs as dashboardsTypeDefs} from './dashboadrs/';

const rootTypes = () => [`
  type Query {
    say: String
    dashboards: [Dashboard]
    user: User
  }
`];

export default [rootTypes, usersTypeDefs, dashboardsTypeDefs];
