import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

const records = await pb.collection('species').getFullList({ $autoCancel: false });

for (let i = 0; i < records.length; ++i) {
	const data = {
		name: records[i].name,
		pageID: records[i].pageID,
		index: i
	};
	const record = await pb.collection('Species').update(records[i].id, data);
}
