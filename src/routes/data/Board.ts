export class Board {
    private board: string[][];

    constructor() {
        this.board = [['','',''],['','',''],['','','']];
    }

    public getBoard(): string[][] {
        return this.board.map(row => [...row]);
    }


    clique(ligne: number, colonne: number) {
        if (this.board[ligne][colonne] === '') {
            this.board[ligne][colonne] = 'X'
        }
        return this
    }
}