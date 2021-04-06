const { model, Schema } = require('mongoose');

const userSchema = new Schema({
	username: String,
	profilePicture: {
		data: Buffer,
		contentType: String,
	},
	password: String,
	email: String,
	createdAt: String,
	bio: String,
	technologies: [],
	comments: [
		{
			body: String,
			username: String,
			createdAt: String,
			likes: [{ username: String, createdAt: String }],
			comments: [
				{
					body: String,
					username: String,
					createdAt: String,
					likes: [{ username: String, createdAt: String }],
				},
			],
		},
	],
});

module.exports = model('User', userSchema);
