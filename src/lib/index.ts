// place files you want to import through the `$lib` alias in this folder.

import type { RecordModel } from 'pocketbase';
import pb from './pb';

export function capitalizeString(string: string) {
	const capitalizedString = string.toUpperCase();
	const newString = capitalizedString.charAt(0) + string.slice(1, string.length);
	return newString;
}

export async function updateElo(winner: RecordModel, loser: RecordModel) {
	let winnerElo = winner.elo;
	let loserElo = loser.elo;

	if (winnerElo > loserElo) {
		winnerElo += loserElo;
		loserElo -= winnerElo / 2;
	} else if (winnerElo < loserElo) {
		winnerElo += loserElo * 2;
		loserElo -= winnerElo;
	} else {
		winnerElo += 5;
		loserElo -= 5;
	}

	if (winnerElo < 0) winnerElo = 0;
	if (loserElo < 0) loserElo = 0;

	winner = { ...winner, elo: winnerElo };
	loser = { ...loser, elo: loserElo };

	const recordW = await pb.collection('Dogs').update(winner.id, winner);
	const recordL = await pb.collection('Dogs').update(loser.id, loser);
}
