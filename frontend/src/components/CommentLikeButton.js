// honestly, tying multiple mutations into the same component is above my head...
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Label } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import MyPopup from '../utils/MyPopup';

export default function CommentLikeButton({
	user,
	commentID,
	commentLikes,
	postID,
}) {
	const [liked, setLiked] = useState(false);
	useEffect(() => {
		if (user && commentLikes.find((like) => like.username === user.username)) {
			setLiked(true);
		} else setLiked(false);
	}, [user, commentLikes]);

	const [likePost] = useMutation(LIKE_COMMENT_MUTATION, {
		variables: { postID: postID, commentID: commentID },
	});

	const likeButton = user ? (
		liked ? (
			<Button color='blue'>
				<Icon name='heart' />
			</Button>
		) : (
			<Button color='blue' basic>
				<Icon name='heart' />
			</Button>
		)
	) : (
		<Button as={Link} to='/login' color='blue' basic>
			<Icon name='heart' />
		</Button>
	);

	return (
		<Button as='div' labelPosition='right' floated='right' onClick={likePost}>
			<MyPopup content={liked ? 'Unlike' : 'Like'}>{likeButton}</MyPopup>
			<Label as='a' basic color='blue' pointing='left'>
				{commentLikes.length}
			</Label>
		</Button>
	);
}

const LIKE_COMMENT_MUTATION = gql`
	mutation likeComment($postID: ID!, $commentID: ID!) {
		likeComment(postID: $postID, commentID: $commentID) {
			id
			likes {
				id
				username
				createdAt
			}
		}
	}
`;
