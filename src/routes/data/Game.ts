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
        const resultat = this._board.clique(ligne, colonne, this.currentPlayer());
        if (resultat) this._nbTour++;
    }
}