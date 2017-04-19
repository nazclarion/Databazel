import { merge } from 'lodash';

import { resolvers as UsersResolvers } from './users/';
import { resolvers as DashboardsResolvers } from './dashboadrs/';

const RootResolvers = {
  Query: {
    say: () => 'hello world',
  },
  Mutation: {
    do: () => 'Done',
  }
};

// Merge all of the resolver objects together
export default merge(RootResolvers, UsersResolvers, DashboardsResolvers);
