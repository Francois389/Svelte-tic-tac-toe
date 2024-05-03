<script>
	import './css/board.css';
	import { Board } from './data/Board.ts';

	export let board = new Board();


</script>
<div class="board">
    {#each board.getBoard() as ligne, indiceLigne}
        <div class="ligne">
            {#each ligne as cellule, indiceColonne}
                <button class="cellule"
                        on:click={() => {board = board.clique(indiceLigne, indiceColonne)}}
                >
                    {cellule}
                </button>
            {/each}
        </div>
    {/each}
</div>
