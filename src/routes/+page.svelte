<script>
	import './css/style.css';
	import Board from './Board.svelte';
	import { Game } from './data/Game.ts';

	let board = [['', '', ''], ['', '', ''], ['', '', '']];
	let game = new Game();
	let winingSquare = [-1];
	let toggled = false;

	let gameHistory = [];

	function forceUpdate() {
		toggled = !toggled; // pour forcer la mise à jour du Board
		game = game;
		board = game.board;
		winingSquare = game.winingSquare;
	}

	function handleClick(event) {
		const pionIsPlace = game.click(event.detail.indiceLigne, event.detail.indiceColonne);
		let newGameHistory = game.createGameHistory(event.detail.indiceLigne, event.detail.indiceColonne);
		if (pionIsPlace) {
			gameHistory = [...gameHistory, newGameHistory];
			forceUpdate();
		}
	}

	function handleReset() {
		game.reset();
		gameHistory = [];
		forceUpdate();
	}

	function handleTravelTime(pastGame, indice) {
		console.log(pastGame);
		game = pastGame.game;
		gameHistory = gameHistory.slice(0, indice + 1);
		forceUpdate();
		console.log(game.board);
	}

</script>

<h1>Tic Tac Toe</h1>
<div class="app">
    <h2 class="status">
        {#if (!game.isGameOver())}
            C'est au joueur { game.currentPlayer() } de jouer
        {:else if (game.isNull() && game.getWinner() === '')}
            Match null
        {:else }
            Le joueur {game.getWinner()} à gagné
        {/if}
    </h2>
    <div class="playingArea">
        <div class="action"></div>
        {#key toggled}
            <Board board={board}
                   winingSquare={winingSquare}
                   matchNull={game.isNull() && game.getWinner() === ''}
                   on:coordonnee={handleClick}
            ></Board>
        {/key}
        <div class="action">
            <button class="reset" on:click={handleReset}>
                Effacer les pions
            </button>
            <div class="timeTravel">
                {#each gameHistory as pastGame, i}
                    <div>
                        <button on:click={() => handleTravelTime(pastGame, i)}
                                class="{i === gameHistory.length - 1 ? 'disabled' : ''}"
                                disabled={i === gameHistory.length - 1}>
                            {i + 1}. Joueur {pastGame.currentPlayer} à joué en ({pastGame.ligne}, {pastGame.colonne})
                        </button>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>