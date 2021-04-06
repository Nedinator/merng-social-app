import { FETCH_USERS_QUERY } from '../utils/graphql';
import React from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Card, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
export default function UsersPage() {
	const { data: { getUsers: users } = {}, loading } = useQuery(
		FETCH_USERS_QUERY
	);

	return (
		<Grid columns={3}>
			<Grid.Row className='page-title'>
				<h1>Users</h1>
			</Grid.Row>
			<Grid.Row>
				{loading ? (
					<h1>Loading users...</h1>
				) : (
					<Grid.Column>
						{users &&
							users.map((profile) => (
								<Card>
									<Card.Content>
										<Image
											floated='right'
											size='mini'
											src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
											as={Link}
											to={`/user/${profile.id}`}
										/>

										<Card.Header as={Link} to={`/user/${profile.id}`}>
											{profile.username}
										</Card.Header>
										<Card.Meta>
											Created: {moment(profile.createdAt).fromNow()}
										</Card.Meta>
									</Card.Content>
								</Card>
							))}
					</Grid.Column>
				)}
			</Grid.Row>
		</Grid>
	);
}
