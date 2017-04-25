import React from 'react';
import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

import DashboardsList from '/imports/ui/components/home/DashboardsList.js';

export const composer = ({ context }, onData) => {
  onData(null, {});
};

export const depsMapper = (context) => ({
  context: () => context,
});

const HomePage = ({ context }) => <DashboardsList context={context}/>;

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(HomePage);
