import gql from 'graphql-tag';
import React, { useContext, useRef, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
	Card,
	Grid,
	Form,
	Image,
	Button,
	Icon,
	Label,
} from 'semantic-ui-react';
import moment from 'moment';
import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import CommentLikeButton from '../components/CommentLikeButton';
import DeleteButton from '../components/DeleteButton';
import MyPopup from '../utils/MyPopup';
function SinglePost(props) {
	const { user } = useContext(AuthContext);
	const postID = props.match.params.postID;

	const commentInputRef = useRef(null);

	const [comment, setComment] = useState('');
	const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
		variables: {
			postID,
		},
	});

	const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
		variables: {
			postID,
			body: comment,
		},
		update() {
			console.log(comment);
			setComment('');
			commentInputRef.current.blur();
		},
	});
	function deletePostCallback() {
		props.history.push('/');
	}

	let postMarkup;
	if (!getPost) {
		postMarkup = <p>Loading post...</p>;
	} else {
		const {
			id,
			body,
			createdAt,
			username,
			comments,
			likes,
			likeCount,
			commentCount,
		} = getPost;
		postMarkup = (
			<Grid>
				<Grid.Row>
					<Grid.Column width={2}>
						<Image
							scr='https://react.semantic-ui.com/images/avatar/large/matthew.png'
							size='small'
							float='right'
						/>
					</Grid.Column>
					<Grid.Column width={10}>
						<Card fluid>
							<Card.Content>
								<Card.Header>{username}</Card.Header>
								<Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
								<Card.Description>{body}</Card.Description>
							</Card.Content>
							<hr />
							<Card.Content extra>
								<LikeButton user={user} post={{ id, likeCount, likes }} />
								<MyPopup content='Comment on post'>
									<Button as='div' labelPosition='right' onClick={() => {}}>
										<Button basic color='blue'>
											<Icon name='comments' />
										</Button>
										<Label basic color='blue' pointing='left'>
											{commentCount}
										</Label>
									</Button>
								</MyPopup>
								{user && user.username === username && (
									<DeleteButton postID={id} callback={deletePostCallback} />
								)}
							</Card.Content>
						</Card>
						{user && (
							<Card fluid>
								<Card.Content>
									<p>Post a comment!</p>
									<Form>
										<div className='ui action input fluid'>
											<input
												type='text'
												placeholder='Comment...'
												name='comment'
												value={comment}
												onChange={(event) => setComment(event.target.value)}
												ref={commentInputRef}
											/>
											<button
												type='submit'
												className='ui button teal'
												disabled={comment.trim() === ''}
												onClick={createComment}>
												Submit
											</button>
										</div>
									</Form>
								</Card.Content>
							</Card>
						)}
						{comments.map((comment) => (
							<Card fluid key={comment.id}>
								<Card.Content>
									<CommentLikeButton
										user={user}
										commentID={comment.id}
										commentLikes={comment.likes}
										postID={postID}
									/>
									{user && user.username === comment.username && (
										<DeleteButton postID={id} commentID={comment.id} />
									)}
									{comment.username === username && (
										<p style={{ color: 'teal' }}>
											<Icon name='user' />
											OP
										</p>
									)}
									<Card.Header>{comment.username}</Card.Header>
									<Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
									<Card.Description>{comment.body}</Card.Description>
								</Card.Content>
							</Card>
						))}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
	return postMarkup;
}
const FETCH_POST_QUERY = gql`
	query($postID: ID!) {
		getPost(postID: $postID) {
			id
			body
			createdAt
			username
			likeCount
			likes {
				username
				createdAt
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

const CREATE_COMMENT_MUTATION = gql`
	mutation($postID: ID!, $body: String!) {
		createComment(postID: $postID, body: $body) {
			id
			body
			comments {
				id
				body
				createdAt
				username
				likes {
					username
					createdAt
				}
			}
			commentCount
		}
	}
`;

export default SinglePost;
