<script>
	import './css/style.css';
	import Board from './Board.svelte';
	import { Game } from './data/Game.ts';

	let board = [['', '', ''], ['', '', ''], ['', '', '']];
	let game = new Game();
	let winingSquare = [-1];
	let toggled = false;

	function forceUpdate() {
		toggled = !toggled; // pour forcer la mise à jour du Board
		game = game;
		board = game.board;
		winingSquare = game.winingSquare;
	}

	function handleClick(event) {
		game.click(event.detail.indiceLigne, event.detail.indiceColonne);
		forceUpdate();
	}

	function handleReset() {
		game.reset();
		forceUpdate();
	}

</script>

<h1>Tic Tac Toe</h1>
<div class="app">
    <div class="status">
        C'est au joueur { game.currentPlayer() } de jouer
    </div>
    <div class="playingArea">
        {#key toggled}
            <Board board={board}
                   winingSquare={winingSquare}
                   on:coordonnee={handleClick}
            ></Board>
        {/key}
        <div class="action">
            <button class="reset" on:click={handleReset}>
                Effacer les pions
            </button>
        </div>
    </div>
</div>