export default {
	User: {
		id: ({ _id }) => _id,
		createdAt: ({ createdAt }) => createdAt.toString(),
		emails: ({ emails }) => emails,
	},
	Query: {
		user: (root, args, context) => {
			const { user } = context;
			return user && user.isAdmin ? user : null;
		}
	}
};
