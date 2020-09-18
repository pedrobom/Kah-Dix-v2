

// Esse módulo representa um jogador em uma sala, com várias informações sobre o jogo
// além do prórpio usuário 
module.exports = class RoomPlayer {
    constructor({user}){
        this.user = user
        this.score = 0
        this.turnScore = 0
        this.hand = []
        this.mySelectedCard = null
        this.selectedCard = null
        this.votedCard = null
    }
}