import { Meteor } from 'meteor/meteor';
import {
  Dashboards
} from '/lib/collections.js';

export default {
  Dashboard: {
    id: ({ _id }) => _id,
    name: ({ name }) => name,
    users: ({ users }) => {
      return Meteor.users.find({
        _id: {
          $in: users,
        },
      }).fetch();
    }
  },
  Query: {
    dashboards: (root, args, context) => {
      const { user } = context;
      return user && user.isAdmin ? Dashboards.find().fetch() : [];
    },
  },
};
