<script lang="ts">
	import type { PageData } from '../$types';

	import map from '$lib/idMap';
	import { capitalizeString, updateElo } from '$lib';
	import { invalidateAll } from '$app/navigation';

	export let data: PageData;

	let breed1;
	let breed2;

	$: breed1 = capitalizeString(data.dog1.Breed);
	$: breed2 = capitalizeString(data.dog2.Breed);

	async function chooseDog(dog: string) {
		if (dog == 'dog1') await updateElo(data.dog1, data.dog2);
		else await updateElo(data.dog2, data.dog1);
		invalidateAll();
	}
</script>

<h1>Which dog is cuter???</h1>
<form>
	<div>
		<input
			type="image"
			src={data.dog1pic}
			id="dog1"
			alt="dog1"
			on:click={() => {
				chooseDog('dog1');
			}}
		/>
		<label>{breed1}</label>
	</div>
	<div class="vs">
		<p>VS</p>
	</div>
	<div>
		<input
			type="image"
			src={data.dog2pic}
			id="dog2"
			alt="dog2"
			on:click={() => {
				chooseDog('dog2');
			}}
		/>
		<label>{breed2}</label>
	</div>
</form>

<style lang="scss">
	form,
	h1 {
		display: flex;
		justify-content: center;
	}

	input {
		height: 500px;
		width: 500px;
		margin-left: 4rem;
		margin-right: 4rem;
	}

	div {
		display: flex;
		flex-direction: column;
		text-align: center;
	}
	label {
		margin-top: 1.5rem;
		font-size: 30px;
		font-weight: bold;
	}

	.vs {
		justify-content: center;

		p {
			font-size: 2.5rem;
			font-weight: bold;
		}
	}
</style>
