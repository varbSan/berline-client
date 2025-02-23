import { DefaultApolloClient } from '@vue/apollo-composable';
import type { App } from 'vue';
import { apolloClient } from './client';

export const registerApollo = (app: App) => {
  app.provide(DefaultApolloClient, apolloClient);
};
