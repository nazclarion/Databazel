import { Meteor } from 'meteor/meteor';
import {
  Dashboards
} from '/lib/collections.js';

Meteor.methods({
  'Dashboards.delete': function(id, userId) {
    if (userId) this.setUserId(userId);

    return Dashboards.remove({
      _id: id,
    });
  },
  'Dashboards.rename': function(id, name, userId) {
    if (userId) this.setUserId(userId);

    return Dashboards.update({
      _id: id,
    }, {
      $set: {
        name,
      },
    });
  },
});
