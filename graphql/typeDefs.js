const { gql } = require('apollo-server');

module.exports = gql`
	type Post {
		id: ID!
		body: String!
		createdAt: String!
		username: String!
		comments: [Comment]!
		likes: [Like]!
		likeCount: Int!
		commentCount: Int!
	}
	type UserPage {
		id: ID!
		createdAt: String!
		username: String!
		email: String!
		bio: String
		getComments: [Comment]
	}
	type Comment {
		id: ID!
		createdAt: String!
		username: String!
		body: String!
		likes: [Like]
		likeCount: Int!
	}
	type Like {
		id: ID!
		createdAt: String!
		username: String!
	}
	type User {
		id: ID!
		email: String!
		token: String!
		username: String!
		createdAt: String!
		bio: String
	}
	input RegisterInput {
		username: String!
		password: String!
		confirmPassword: String!
		email: String!
	}
	input updateInput {
		bio: String
	}
	type Query {
		getPosts: [Post]
		getPost(postID: ID!): Post
		getUser(id: ID!): UserPage
		getUsers: [User]
	}
	type Mutation {
		register(registerInput: RegisterInput): User!
		login(username: String!, password: String!): User!
		createPost(body: String!): Post!
		deletePost(postID: ID!): String!
		createComment(postID: ID!, body: String!): Post!
		deleteComment(postID: ID!, commentID: ID!): Post!
		likePost(postID: ID!): Post!
		likeComment(postID: ID!, commentID: ID!): Comment!
		updateUser(id: ID!, password: String!, updateInput: updateInput): User!
	}
	type Subscription {
		newPost: Post!
	}
`;
