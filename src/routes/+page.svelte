<script>
	import './css/style.css';
	import Board from './Board.svelte';

	const board = [['','',''],['','X',''],['','','']];
</script>

<div class="app">
    <Board board={board}/>
</div>