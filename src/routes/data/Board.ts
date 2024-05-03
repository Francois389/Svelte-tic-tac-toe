export class Board {
    private board: string[][];

    constructor() {
        this.board = [['','',''],['','',''],['','','']];
    }

    public getBoard(): string[][] {
        return this.board.map(row => [...row]);
    }


    clique(ligne: number, colonne: number, playerSymbole: string) {
        if (this.board[ligne][colonne] === '') {
            this.board[ligne][colonne] = playerSymbole
            return true
        }
        return false
    }
}