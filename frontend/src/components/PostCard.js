import React, { useContext } from 'react';
import { Card, Image, Button, Icon, Label } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import MyPopup from '../utils/MyPopup';
function PostCard({
	post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
	const { user } = useContext(AuthContext);

	return (
		<Card fluid>
			<Card.Content>
				<Image
					floated='right'
					size='mini'
					src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
				/>
				<Card.Header>{username}</Card.Header>
				<Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
				<Card.Description as={Link} to={`/posts/${id}`}>
					{body}
				</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<LikeButton user={user} post={{ id, likes, likeCount }} />
				<MyPopup content='Comment on post'>
					<Button labelPosition='right' as={Link} to={`/posts/${id}`}>
						<Button color='blue' basic>
							<Icon name='comments' />
						</Button>
						<Label basic color='blue' pointing='left'>
							{commentCount}
						</Label>
					</Button>
				</MyPopup>

				{user && user.username === username && (
					<DeleteButton user={user} postID={id} />
				)}
			</Card.Content>
		</Card>
	);
}

export default PostCard;
