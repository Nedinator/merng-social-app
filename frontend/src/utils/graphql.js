import gql from 'graphql-tag';
export const FETCH_POSTS_QUERY = gql`
	{
		getPosts {
			id
			body
			createdAt
			username
			likeCount
			likes {
				username
			}
			commentCount
			comments {
				id
				username
				createdAt
				body
				likes {
					username
					createdAt
				}
			}
		}
	}
`;

export const FETCH_USERS_QUERY = gql`
	{
		getUsers {
			id
			username
			createdAt
			email
		}
	}
`;
