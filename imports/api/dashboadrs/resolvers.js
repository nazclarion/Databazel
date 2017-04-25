import { Meteor } from 'meteor/meteor';
import {
  Dashboards
} from '/lib/collections.js';

export default {
  Dashboard: {
    id: ({ _id }) => _id,
    name: ({ name }) => name,
    users: ({ _id, users }) => {
      return _id && Meteor.users.find({
        _id: {
          $in: users,
        },
      }).fetch();
    }
  },
  Query: {
    dashboards: (root, args, context) => {
      return Dashboards.find().fetch();
    },
  },
  Mutation: {
    submitDashboard: (root, args, context) => {
      const { name } = args;

      const _dashboardId = Dashboards.insert({
        name,
        chartsId: [],
        users: [context.userId],
        viewsCounter: 0,
      });
      return Dashboards.findOne(_dashboardId);
    },
    copyDashboard: (root, args, context) => {
      const { id: _id } = args;

      return new Promise((resolve, reject) => {
        const _dashboard = Dashboards.findOne(_id);
        if (!_dashboard) {
          reject(new Meteor.Error('Dashboards.NotFound', `Dashboard {_id: ${_id}} not found`))
        };

        delete _dashboard._id;
        const _newDashboardId = Dashboards.insert({
          ..._dashboard,
          name: `${_dashboard.name} copy`,
          users: [context.userId],
        });

        resolve(Dashboards.findOne(_newDashboardId));
      });
    },
    renameDashboard: (root, args, context, info) => {
      const { id: _id, name } = args;

      return new Promise((resolve, reject) => {
        Dashboards.update({
          _id: _id,
        }, {
          $set: {
            name,
          },
        }, error => {
          if (error) {
            reject(error);
          };
          resolve(Dashboards.findOne(_id));
        });
      });
    },
    deleteDashboard: (root, args, context, info) => {
      const { id: _id } = args;

      return new Promise((resolve, reject) => {
        const _collection = Dashboards.rawCollection();

        _collection.deleteOne({
          _id: _id,
        }, error => {
          if (error) {
            reject(error);
          };
          resolve({ _id });
        });
      });
    },
  },
};
