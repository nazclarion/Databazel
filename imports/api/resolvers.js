import { merge } from 'lodash';

import { resolvers as HelloResolvers } from './hello/';
import { resolvers as UsersResolvers } from './users/';

// Merge all of the resolver objects together
export default merge(HelloResolvers, UsersResolvers);
