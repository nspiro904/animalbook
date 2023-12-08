<script lang="ts">
	let dogos;
	async function getDogos() {
		const response = await fetch(' https://dog.ceo/api/breeds/list/all');
		const dogosRaw = await response.json();
		const dogosArray = Object.entries(dogosRaw.message);

		dogos = dogosArray.map((dogo) => {
			let newEntry;
			const name = dogo[0];
			newEntry = [name];
			return newEntry;
		});

		const dogosDump = dogos.map(async (dogo, key) => {
			const response = await fetch(`https://dog.ceo/api/breed/${dogo[0]}/images/random`);
			const picResponse = await response.json();
			dogos[key] = [...dogo, picResponse.message];
		});
		console.log(dogos);
	}
</script>

<h1>here be dogos</h1>
<button on:click={getDogos}>Get Puppers</button>

{#if dogos}
	<table>
		<th>Breed</th>
		<th>Picture</th>
		{#each dogos as dogo}
			<tr>
				<td>{dogo[0]}</td>
				<td><img src={dogo[1]} /></td>
			</tr>
		{/each}
	</table>
{/if}
