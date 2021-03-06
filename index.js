const { ApolloServer, PubSub } = require('apollo-server');

//
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/merng-social-app', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
//
//
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const pubsub = new PubSub();

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req, pubsub }),
});

server.listen({ port: 5000 }).then((res) => {
	console.log(`Server running at ${res.url}`);
});
