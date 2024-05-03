<script>
	import './css/board.css';
	import { Board } from './data/Board.ts';
	import { createEventDispatcher } from 'svelte';

	export let board =  [['','',''],['','',''],['','','']];;

	const clickDispatch = createEventDispatcher();

	function handleClick(ligne, colonne) {
		clickDispatch('coordonnee', {
			indiceLigne: ligne,
			indiceColonne: colonne
		});
	}


</script>
<div class="board">
    {#each board as ligne, indiceLigne}
        <div class="ligne">
            {#each ligne as cellule, indiceColonne}
                <button class="cellule"
                        on:click={() => {handleClick(indiceLigne, indiceColonne)}}
                >
                    {cellule}
                </button>
            {/each}
        </div>
    {/each}
</div>
