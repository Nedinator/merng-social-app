import React, { useState } from 'react';
import { Button, Confirm, Icon } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { FETCH_POSTS_QUERY } from '../utils/graphql';
import MyPopup from '../utils/MyPopup';
export default function DeleteButton({ postID, commentID, callback }) {
	const [confirmOpen, setConfirmOpen] = useState(false);
	const mutation = commentID ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
	const [deletePost] = useMutation(mutation, {
		update(proxy) {
			setConfirmOpen(false);
			if (!commentID) {
				const data = proxy.readQuery({
					query: FETCH_POSTS_QUERY,
				});
				let newData = [...data.getPosts.filter((p) => p.id !== postID)];

				proxy.writeQuery({
					query: FETCH_POSTS_QUERY,
					data: { getPosts: newData },
				});
			}
			if (callback) callback();
		},
		variables: { postID, commentID },
	});

	return (
		<>
			<MyPopup content={commentID ? 'Delete comment' : 'Delete post'}>
				<Button
					as='div'
					color='red'
					floated='right'
					onClick={() => setConfirmOpen(true)}>
					<Icon name='trash' style={{ margin: 0 }} />
				</Button>
			</MyPopup>

			<Confirm
				open={confirmOpen}
				onCancel={() => {
					setConfirmOpen(false);
				}}
				onConfirm={deletePost}
			/>
		</>
	);
}

const DELETE_POST_MUTATION = gql`
	mutation deletePost($postID: ID!) {
		deletePost(postID: $postID)
	}
`;

const DELETE_COMMENT_MUTATION = gql`
	mutation deleteComment($postID: ID!, $commentID: ID!) {
		deleteComment(postID: $postID, commentID: $commentID) {
			id
			comments {
				id
				username
				createdAt
				body
			}
			commentCount
		}
	}
`;
