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
		technologies: [String]
		getComments: [Comment]
	}
	type Comment {
		id: ID!
		createdAt: String!
		username: String!
		body: String!
		comments: [Comment!]
		likes: [Likes]
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
		comments: [Comment]
		bio: String
		technologies: [String]
	}
	input RegisterInput {
		username: String!
		password: String!
		confirmPassword: String!
		email: String!
	}
	input updateInput {
		password: String
		confirmPassword: String
		email: String
		bio: String
		technologies: [String]
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
		createComment(postID: ID!, commentID: ID!, body: String!): Post!
		deleteComment(postID: ID!, commentID: ID!): Post!
		likePost(postID: ID!): Post!
		likeComment(commentID: ID!): Comment!
		updateUser(updateInput: updateInput): User!
	}
	type Subscription {
		newPost: Post!
	}
`;
