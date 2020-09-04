module.exports = class Results {
    constructor({turn, turnPlayer, turnPrompt, turnPlayerCard, players}){
        this.turn = turn
        this.turnPlayer = turnPlayer
        this.turnPrompt = turnPrompt
        this.turnPlayerCard = turnPlayerCard
        this.players = [players]
    }
}