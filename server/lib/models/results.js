module.exports = class Results {
    constructor({turn, turnPlayer, turnPrompt, turnPlayerCard, turnPlayerScore, players}){
        this.turn = turn
        this.turnPlayer = turnPlayer
        this.turnPrompt = turnPrompt
        this.turnPlayerCard = turnPlayerCard
        this.turnPlayerScore = turnPlayerScore
        this.players = players
    }
}