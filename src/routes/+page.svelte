<script>
	import './css/style.css';
	import Board from './Board.svelte';
	import { Board as BoardClasse } from './data/Board.ts';

	const board = new BoardClasse();

</script>

<div class="app">
    <Board board={board}/>
</div>