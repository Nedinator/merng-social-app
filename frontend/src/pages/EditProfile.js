import React, { useContext, useState } from 'react';
import { Button, Form, TextArea } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { AuthContext } from '../context/auth';
export default function EditProfile(props) {
	const { user } = useContext(AuthContext);
	const [bio, setBio] = useState('Bio...');
	const id = props.match.params.id;

	return (
		<div className='form-container'>
			{user && user.id === id && (
				<Form noValidate>
					<Form.Field label='About you!' placeholder={bio} control={TextArea} />
					<Button type='submit' primary>
						Save
					</Button>
				</Form>
			)}
		</div>
	);
}

const GET_USER = gql`
	query($userID: ID!) {
		getUser(userID: $userID) {
			id
			bio
			username
			createdAt
		}
	}
`;
