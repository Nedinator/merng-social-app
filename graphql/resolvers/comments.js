const { AuthenticationError, UserInputError } = require('apollo-server');
const Post = require('../../models/post');

const checkAuth = require('../../utils/check-auth');

module.exports = {
	Mutation: {
		async likeComment(_, { postID, commentID }, context) {
			const { username } = checkAuth(context);

			const post = await Post.findById(postID);

			if (post && post.comments.find((comment) => comment.id === commentID)) {
				if (
					post.comments
						.find((comment) => comment.id === commentID)
						.likes.find((like) => like.username === username)
				) {
					//post already liked, unliking
					post.comments.find(
						(comment) => comment.id === commentID
					).likes = post.comments
						.find((comment) => comment.id === commentID)
						.likes.filter((like) => like.username !== username);
				} else {
					//not liked, like it
					post.comments
						.find((comment) => comment.id === commentID)
						.likes.push({
							username,
							createdAt: new Date().toISOString(),
						});
				}
				post.markModified('comments');
				console.log('updating?');
				await post.save();
				return post.comments.find((comment) => comment.id === commentID);
			} else throw new UserInputError('Post not found.');
		},
		createComment: async (_, { postID, body }, context) => {
			//
			const { username } = checkAuth(context);
			if (body.trim() == '') {
				throw new UserInputError('Please type something in the comment', {
					errors: {
						body: 'Comment body must not be empty',
					},
				});
			}
			const post = await Post.findById(postID);

			if (post) {
				post.comments.unshift({
					body,
					username,
					createdAt: new Date().toISOString(),
				});
				await post.save();
				return post;
			} else throw new UserInputError('Post not found?');
		},
		async deleteComment(_, { postID, commentID }, context) {
			const { username } = checkAuth(context);

			const post = await Post.findById(postID);

			if (post) {
				const commentIndex = post.comments.findIndex((c) => (c.id = commentID));

				if (post.comments[commentIndex].username === username) {
					post.comments.splice(commentIndex, 1);
					await post.save();
					return post;
				} else {
					throw new AuthenticationError('Action not allowed');
				}
			} else {
				throw new UserInputError('Post not found');
			}
		},
	},
};
