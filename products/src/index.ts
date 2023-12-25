import { defineEndpoint } from '@directus/extensions-sdk';

export default defineEndpoint((router) => {
	router.get('/', (_req:any, res:any) => res.send('Hello, From Directus Dockerization!'));
});
