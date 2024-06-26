import { Board } from './Board.ts';

export class Game {
    private static readonly players = ['X', 'O'];

    private _board: Board;
    private _nbTour: number;
    private _winingSquare: number[];

    constructor() {
        this._board = new Board();
        this._nbTour = 0;
        this._winingSquare = [-1];
    }

    get board(): string[][] {
        return this._board.getBoard();
    }

    get winingSquare(): number[] {
        return [...this._winingSquare];
    }

    public currentPlayer(): string {
        return Game.players[this._nbTour % 2];
    }

    /**
     * Place si possible le pion du joueur courant sur cellule donnée par la ligne et la colonne
     * @param ligne
     * @param colonne
     * @return true si le pion a été posé, false sinon
     */
    public click(ligne: number, colonne: number): boolean {
        let pionIsPlace = false;
        if (!this.isGameOver()) {
            pionIsPlace = this._board.clique(ligne, colonne, this.currentPlayer());
            if (pionIsPlace) this._nbTour++;
        }
        this.updateWinigSquare();
        return pionIsPlace;
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

    public updateWinigSquare(): void {
        let tempWiningSquare: number[] = [];
        for (let i = 0; i < 3; i++) {
            const premierLigne = this.board[i][0];
            const premierColonne = this.board[0][i];
            let ligneIdentique = premierLigne !== '';
            let colonneIdentique = premierColonne !== '';

            for (let j = 1; j < 3 && (ligneIdentique || colonneIdentique); j++) {
                ligneIdentique = ligneIdentique && premierLigne === this.board[i][j];
                colonneIdentique = colonneIdentique && premierColonne === this.board[j][i];
            }
            if (ligneIdentique) {
                tempWiningSquare = [...tempWiningSquare, i * 3, i * 3 + 1, i * 3 + 2];
            }
            if (colonneIdentique) {
                tempWiningSquare = [...tempWiningSquare, i, 3 + i, 6 + i];
            }
        }

        // Diagonales
        const premierDiagonalNW = this.board[0][0];
        if (this.board[1][1] === premierDiagonalNW && this.board[2][2] === premierDiagonalNW && premierDiagonalNW !== '') tempWiningSquare = [...tempWiningSquare, 0, 4, 8];
        const premierDiagonalSE = this.board[0][2];
        if (this.board[1][1] === premierDiagonalSE && this.board[2][0] === premierDiagonalSE && premierDiagonalSE !== '') tempWiningSquare = [...tempWiningSquare, 2, 4, 6];

        this._winingSquare = tempWiningSquare;
    }

    public reset() {
        this._board.reset();
        this._nbTour = 0;
        this._winingSquare = [];
    }

    public copie(): Game {
        const newGame = new Game();
        newGame._board = this._board.copie();
        newGame._nbTour = this._nbTour;
        newGame._winingSquare = [...this._winingSquare];

        return newGame;
    }

    public createGameHistory(ligne, colonne) {
        const resultat = {
            'game': this.copie(),
            'currentPlayer': Game.players[(this._nbTour + 1) % 2],
            'ligne': ligne,
            'colonne': colonne
        };

        return resultat;
    }

    public getWinner(): string {
        return this._winingSquare.length == 0 ? '' : Game.players[(this._nbTour + 1) % 2];
    }

    public isNull(): boolean {
        return this._board.isFull();
    }
}