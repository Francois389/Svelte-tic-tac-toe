import { Board } from './Board.ts';

export class Game {


    private readonly players = ['X', 'O'];

    private _board: Board;
    private _nbTour: number;

    constructor() {
        this._board = new Board();
        this._nbTour = 0;
    }

    get board(): string[][] {
        return this._board.getBoard();
    }

    public currentPlayer(): string {
        return this.players[this._nbTour % 2];
    }

    public click(ligne: number, colonne: number) {
        if (!this.isGameOver()) {
            const resultat = this._board.clique(ligne, colonne, this.currentPlayer());
            if (resultat) this._nbTour++;
        }
    }

    public isGameOver(): boolean {
        return this._board.isFull() || this.isWinning('X') || this.isWinning('O');
    }

    public isWinning(playerSymbole: string): boolean {
        // Lignes
        if (this.board[0][0] === playerSymbole && this.board[0][1] === playerSymbole && this.board[0][2] === playerSymbole) return true;
        if (this.board[1][0] === playerSymbole && this.board[1][1] === playerSymbole && this.board[1][2] === playerSymbole) return true;
        if (this.board[2][0] === playerSymbole && this.board[2][1] === playerSymbole && this.board[2][2] === playerSymbole) return true;

        //Colonnes
        if (this.board[0][0] === playerSymbole && this.board[1][0] === playerSymbole && this.board[2][0] === playerSymbole) return true;
        if (this.board[0][1] === playerSymbole && this.board[1][1] === playerSymbole && this.board[2][1] === playerSymbole) return true;
        if (this.board[0][2] === playerSymbole && this.board[1][2] === playerSymbole && this.board[2][2] === playerSymbole) return true;

        //Diagonales
        if (this.board[0][0] === playerSymbole && this.board[1][1] === playerSymbole && this.board[2][2] === playerSymbole) return true;
        return this.board[0][2] === playerSymbole && this.board[1][1] === playerSymbole && this.board[2][0] === playerSymbole;
    }
}