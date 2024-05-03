<script>
	import './css/style.css';
	import Board from './Board.svelte';
	import { Board as BoardClasse } from './data/Board.ts';
	import { Game } from './data/Game.ts';

	let board =  [['','',''],['','',''],['','','']];
	let game = new Game();

	function handleClick(event) {
		game.click(event.detail.indiceLigne, event.detail.indiceColonne);
		board = game.board;
	}

</script>

<div class="app">
    <Board board={board} on:coordonnee={handleClick} />
</div>