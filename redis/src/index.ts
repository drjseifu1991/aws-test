import { defineHook } from '@directus/extensions-sdk';
import { createClient } from 'redis'

export default defineHook(({ filter, action, init }) => {

	init('app.before', async () => {
		const client = createClient({
			url: process.env.REDIS
		})

		client.on('error', err => console.log('Redis Client Error', err));

		await client.connect();

		console.log(client)

		await client.hSet('user-session:123', {
			name: 'John',
			surname: 'Smith',
			company: 'Redis',
			age: 29
	})
	
		const value = await client.hGetAll('user-session:123');
		console.log(value)
	})

	filter('items.create', () => {
		console.log('Creating Item!');
	});

	action('items.create', () => {
		console.log('Item created!');
	});
});