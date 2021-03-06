import React from 'react';
import { setContext } from 'apollo-link-context';
import App from './App';
import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	ApolloProvider,
} from '@apollo/client';

const httpLink = createHttpLink({
	uri: 'http://localhost:5000',
});

const authLink = setContext(() => {
	const token = localStorage.getItem('jwtToken');
	return {
		headers: {
			Authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

export default (
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
);
