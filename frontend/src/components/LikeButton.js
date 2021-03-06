import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Label } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import MyPopup from '../utils/MyPopup';
export default function LikeButton({ user, post: { id, likes, likeCount } }) {
	const [liked, setLiked] = useState(false);

	useEffect(() => {
		if (user && likes.find((like) => like.username === user.username)) {
			setLiked(true);
		} else setLiked(false);
	}, [user, likes]);

	const [likePost] = useMutation(LIKE_POST_MUTATION, {
		variables: { postID: id },
		errorPolicy: 'all',
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
		<Button as='div' labelPosition='right' onClick={likePost}>
			<MyPopup content={liked ? 'Unlike' : 'Like'}>{likeButton}</MyPopup>
			<Label as='a' basic color='blue' pointing='left'>
				{likeCount}
			</Label>
		</Button>
	);
}

const LIKE_POST_MUTATION = gql`
	mutation likePost($postID: ID!) {
		likePost(postID: $postID) {
			id
			likes {
				id
				username
			}
			likeCount
		}
	}
`;
