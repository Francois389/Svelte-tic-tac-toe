<script>
	import './css/style.css';
	import Board from './Board.svelte';
	import { Board as BoardClasse } from './data/Board.ts';
	import { Game } from './data/Game.ts';

	let board = [['', '', ''], ['', '', ''], ['', '', '']];
	let game = new Game();
	let winingSquare = [-1];
	let toggled = false;

	function handleClick(event) {
		toggled = !toggled;
		game.click(event.detail.indiceLigne, event.detail.indiceColonne);
		game = game;
		board = game.board;
		winingSquare = game.winingSquare;
	}

</script>

<h1>Tic Tac Toe</h1>
<div class="app">
    <div class="status">
        C'est au joueur { game.currentPlayer() } de jouer
    </div>
    {#key toggled}
        <Board board={board}
               winingSquare={winingSquare}
               on:coordonnee={handleClick}
        ></Board>
    {/key}
</div>