import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

let finished = false;
let searchContinue = '';
let count = 0;
let failCount = 0;
let batches = [];
do {
	try {
		const response = await fetch(
			`https://en.wikipedia.org/w/api.php?action=query&generator=categorymembers&gcmtitle=Category:Articles with 'species' microformats&format=json&gcmlimit=max&gcmcontinue=${searchContinue}`
		);
		const results = await response.json();
		if (results.continue == undefined) finished = true;
		if (results.continue?.gcmcontinue != undefined) searchContinue = results.continue.gcmcontinue;
		batches.push(results);
		console.log('parsing', searchContinue, count, batches.length);
		count += 500;
	} catch (e) {
		console.log(e);
		console.log('fetch failed');
		++failCount;
	}
} while (finished == false);

console.log('TOTAL PAGES: ' + count);
console.log('POSTS FAILED: ' + failCount);

batches.forEach(async (batch) => {
	const data = {
		data: JSON.stringify(batch)
	};
	console.log('Adding batch', batch);
	await pb.collection('batch').create(data, { $autoCancel: false });
});

function parseSpecies(species) {
	const pagesObject = species.query.pages;
	const pagesArray = Object.values(pagesObject);

	pagesArray.forEach(async (page) => {
		const data = {
			Name: page.title,
			pageID: page.pageid
		};
		try {
			const record = await pb.collection('Species').create(data, { $autoCancel: false });
		} catch (e) {
			++failCount;
			console.log(e);
			console.log('failed', data);
			console.log('Failed Count: ', failCount);
		}
	});
}
