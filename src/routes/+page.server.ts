/*
 DOCUMENTATION: https://portal.apis.huit.harvard.edu/docs/ats-dining/1/overview
 import { env } from '$env/dynamic/private';
 Hacky way to do this, but I grabbed the data and manually cleaned it so that I could use it in this app, though you
 can check hudsgry-api for more information about the status of me trying to forcefully grab the data once every week
 and then update it, and push it to a postgres db, and then redis cache that this will access.
*/

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	const now = new Date();
	const dateTime = now.toLocaleString('en-us', {
		hour12: false,
		month: '2-digit',
		day: '2-digit',
		year: 'numeric'
	});
	const hours = now.getHours();
	let timeOfDay = 0;

	const date = dateTime;

	// Based on time of day choose the right tba
	if (hours < 11) {
		timeOfDay = 0;
	} else if (hours < 15) {
		timeOfDay = 1;
	} else {
		timeOfDay = 2;
	}
	// console.log(date);
	const res = await fetch(`https://hudsgry-api.fly.dev/huds-data?serve_date=${date}`);
	const data = await res.json();

	console.log(params.date);
	console.log(params.date);

	// data = JSON.parse(data);
	return { data, timeOfDay };
	// .then(res => res.json())
	// .then(data => {
	//     console.log(data)
	//     return data
	// })
	// .catch(err => {
	//     console.log(err)
	//     return {err}
	// })

	// HUDS api call
	// const url = "https://go.apis.huit.harvard.edu/ats/dining/v3/events"
	// const res = await fetch(url, {
	//     headers: {
	//         "x-api-key": env.API_KEY,
	//         date: "05/02/2023"
	//     }
	// });
	// const item = await res.json();
	//
	// console.log(res.status)
	// console.log(item)

	// return { item };
}
