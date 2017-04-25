import { mount } from 'react-mounter';
import React from 'react';

import { ApolloClient, ApolloProvider } from 'react-apollo';

import HomePage from '/imports/ui/pages/HomePage.js';

// Create the client
const client = new ApolloClient({
  dataIdFromObject: o => o.id
});

export default function (injectDeps, { MainLayout }) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/gql', {
    name: 'gql',
    action() {
      mount(MainLayoutCtx, {
        content: () => <ApolloProvider client={client}><HomePage /></ApolloProvider>,
      });
    },
  });
}
