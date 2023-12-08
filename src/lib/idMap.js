import pb from './pb.js';

const map = new Map();

const records = await pb.collection('Dogs').getFullList();

records.forEach((record) => {
	map.set(record.index, record.id);
});

export default map;
