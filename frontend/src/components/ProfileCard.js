import React, { useContext } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';
export default function ProfileCard({ id, createdAt, username, bio }) {
	const { user } = useContext(AuthContext);
	return (
		<Card fluid>
			<Card.Content>
				<Image
					floated='right'
					size='mini'
					src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
					as={Link}
					to={`/user/${id}`}
				/>

				<Card.Header as={Link} to={`/user/${id}`}>
					{username}
				</Card.Header>
				<Card.Meta>Created: {moment(createdAt).fromNow()}</Card.Meta>
				<Card.Content>
					{user && user.id === id && (
						<Button as={Link} to={`/user/${id}/edit`}>
							Edit Profile
						</Button>
					)}
				</Card.Content>
				<Card.Content extra>{bio && <p>Bio: {bio}</p>}</Card.Content>
			</Card.Content>
		</Card>
	);
}
