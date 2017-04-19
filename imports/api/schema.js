import { typeDefs as UsersTypeDefs} from './users/';
import { typeDefs as DashboardsTypeDefs} from './dashboadrs/';

const RootTypes = () => [`
  type Query {
    say: String
  }
`];

export default [RootTypes, UsersTypeDefs, DashboardsTypeDefs];
