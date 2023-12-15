import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

const list = await pb.collection('batch').getFullList();

const batchArray = Object.values(list);

let species = [];
let record;

batchArray.forEach(async (batch) => {
	const pages = Object.values(batch.data.query.pages);

	species = species.concat(pages);
});

readSpecies(species);

async function readSpecies(arr) {
	let record;

	for (let i = 0; i < arr.length; ++i) {
		const data = {
			name: arr[i].title,
			pageID: arr[i].pageid
		};
		record = await pb.collection('Species').create(data, { $autoCancel: false });
		console.log(record);
	}
}
