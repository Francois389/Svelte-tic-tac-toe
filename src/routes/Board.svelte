<script>
	import './css/board.css';
	import { createEventDispatcher } from 'svelte';

	export let board = [['', '', ''], ['', '', ''], ['', '', '']];
	export let winingSquare = [-1];

	const clickDispatch = createEventDispatcher();

	function handleClick(ligne, colonne) {
		clickDispatch('coordonnee', {
			indiceLigne: ligne,
			indiceColonne: colonne
		});
	}

	function isWiningSquare(ligne, colonne) {
		return winingSquare.includes(ligne * 3 + colonne);
	}

	console.log(winingSquare);
</script>

<div class="board">
    {#each board as ligne, indiceLigne}
        <div class="ligne">
            {#each ligne as cellule, indiceColonne}
                <button class="cellule {isWiningSquare(indiceLigne, indiceColonne) ? 'wining': ''}"
                        on:click={() => {handleClick(indiceLigne, indiceColonne)}}
                >
                    {cellule}
                </button>
            {/each}
        </div>
    {/each}
</div>
