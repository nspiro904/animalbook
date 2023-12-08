import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

let dogos;
await getDogos();

async function getDogos() {
	const response = await fetch(' https://dog.ceo/api/breeds/list/all');
	const dogosRaw = await response.json();
	const dogosArray = Object.entries(dogosRaw.message);

	dogos = dogosArray.map((dogo, key) => {
		let newEntry;
		const name = dogo[0];
		newEntry = [name, key];
		return newEntry;
	});

	const dogosDump = dogos.map(async (dogo, key) => {
		const response = await fetch(`https://dog.ceo/api/breed/${dogo[0]}/images/random`);
		const picResponse = await response.json();
		dogos[key] = [...dogo, picResponse.message];
	});

	console.log(dogos);
	dogos.forEach(async (dog) => {
		const data = {
			Breed: dog[0],
			index: dog[1]
		};
		const record = await pb.collection('Dogs').create(data, { $autoCancel: false });
	});
}
