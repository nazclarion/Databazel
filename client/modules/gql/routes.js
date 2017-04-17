import { mount } from 'react-mounter';
import React from 'react';

import GQLPage from '/imports/ui/pages/GQLPage.js';

export default function (injectDeps, { MainLayout }) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/gql', {
    name: 'gql',
    action() {
      mount(MainLayoutCtx, {
        content: () => <GQLPage />,
      });
    },
  });
}
