import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function ProfileCard({ id, createdAt, username }) {
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
			</Card.Content>
		</Card>
	);
}
