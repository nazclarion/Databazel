const User = `
  type Email {
    address: String
    verified: Boolean
  }
  type User {
    id: String
    emails: [Email]
    createdAt: String
  }
  extend type Query {
    user: User
  }
`;

export default () => [User];
