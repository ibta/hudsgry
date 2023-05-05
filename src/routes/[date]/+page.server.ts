import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	params.date = params.date.replaceAll('-', '/');
	console.log(params.date);
	console.log(params.date);
	const res = await fetch(`https://hudsgry-api.fly.dev/huds-data?serve_date=${params.date}`);
	const data = await res.json();

	// console.log(data);

	if (data.error) {
		throw error(404, {
			message: 'date out of range!'
		});
	}
	return { data, date: params.date };
}
