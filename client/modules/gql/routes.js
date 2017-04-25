import { mount } from 'react-mounter';
import React from 'react';

import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { meteorClientConfig } from 'meteor/apollo';

import HomePage from '/imports/ui/pages/HomePage.js';

// Create the client
const client = new ApolloClient(meteorClientConfig());

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
