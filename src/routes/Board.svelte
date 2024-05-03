<script>
	import './css/board.css';

	export let board = [['','',''],['','',''],['','','']];

</script>
<div class="board">
    {#each board as ligne}
        <div class="ligne">
            {#each ligne as cellule}
                <div class="cellule">{cellule}</div>
            {/each}
        </div>
    {/each}
</div>
