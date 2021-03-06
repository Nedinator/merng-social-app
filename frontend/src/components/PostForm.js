import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useForm } from '../utils/hooks';
import { useMutation } from '@apollo/client';
import { FETCH_POSTS_QUERY } from '../utils/graphql';

export default function PostForm() {
	const { values, onChange, onSubmit } = useForm(createPostCallback, {
		body: '',
	});

	const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
		variables: values,
		update(proxy, result) {
			const data = proxy.readQuery({
				query: FETCH_POSTS_QUERY,
			});

			proxy.writeQuery({
				query: FETCH_POSTS_QUERY,
				data: { getPosts: [result.data.createPost, ...data.getPosts] },
			});

			values.body = '';
		},
		errorPolicy: 'all',
	});

	function createPostCallback() {
		createPost();
	}
	return (
		<div>
			<Form onSubmit={onSubmit}>
				<h2>Create a post:</h2>
				<Form.Field>
					<Form.Input
						placeholder='Say something!'
						name='body'
						onChange={onChange}
						value={values.body}
						error={error ? true : false}
					/>
					<Button type='Submit' color='teal'>
						Submit
					</Button>
				</Form.Field>
			</Form>
			{error && (
				<div className='ui error message' style={{ marginBottom: 25 }}>
					<ul className='list'>
						<li>something went wrong this buggin</li>
					</ul>
				</div>
			)}
		</div>
	);
}

const CREATE_POST_MUTATION = gql`
	mutation createPost($body: String!) {
		createPost(body: $body) {
			id
			body
			createdAt
			username
			likes {
				id
				username
				createdAt
			}
			likeCount
			comments {
				id
				body
				username
				createdAt
				likes {
					username
					createdAt
				}
			}
			commentCount
		}
	}
`;
