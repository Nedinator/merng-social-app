import React from 'react';
import { useQuery } from '@apollo/client';
import ProfileCard from '../components/ProfileCard';

import gql from 'graphql-tag';

export default function UserProfile(props) {
	const id = props.match.params.id;
	const { data: { getUser } = {} } = useQuery(FETCH_USER_QUERY, {
		variables: {
			id,
		},
	});
	// if (getUser) {
	// 	const { createdAt, username } = getUser;
	// }
	let userMarkup;
	if (!getUser) {
		userMarkup = <p>Loading user...</p>;
	} else {
		const { createdAt, username } = getUser;
		userMarkup = (
			<ProfileCard id={id} createdAt={createdAt} username={username} />
		);
	}
	return <>{userMarkup}</>;
}

const FETCH_USER_QUERY = gql`
	query($id: ID!) {
		getUser(id: $id) {
			id
			createdAt
			username
		}
	}
`;
