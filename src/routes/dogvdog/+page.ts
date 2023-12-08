import map from '$lib/idMap';
import pb from '$lib/pb.js';

export async function load() {
	const dog1ID = map.get(randomDog());
	const dog2ID = map.get(randomDog());

	const dog1 = await pb.collection('Dogs').getOne(dog1ID);
	const dog2 = await pb.collection('Dogs').getOne(dog2ID);

	const dog1picResponse = await fetch(`https://dog.ceo/api/breed/${dog1.Breed}/images/random`);

	const dog1pic = await dog1picResponse.json();
	const dog2picResponse = await fetch(`https://dog.ceo/api/breed/${dog2.Breed}/images/random`);
	const dog2pic = await dog2picResponse.json();

	return { dog1: dog1, dog1pic: dog1pic.message, dog2: dog2, dog2pic: dog2pic.message };
}

function randomDog() {
	return Math.floor(Math.random() * 105);
}
