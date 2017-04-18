import { typeDefs as usersTypeDefs} from './users/';

const rootTypes = () => [`
	type Query {
		say: String
		user: User
	}
`];

export default [rootTypes, usersTypeDefs];
