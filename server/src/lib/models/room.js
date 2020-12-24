const RoomPlayer = require('./room_player')

// Esse módulo representa um jogador uma sala com todas as informações sobre uma 
// sala e o jogo que está sendo executado :)
module.exports = class Room {
    // Isso define os possiveis estados de um jogo / sala
    static States = {
        WAITING_FOR_PLAYERS: "WAITING_FOR_PLAYERS",
        ONGOING_GAME: "ONGOING_GAME",
        PICKING_PROMPT: "PICKING_PROMPT",
        SELECTING_CARDS: "SELECTING_CARDS",
        VOTING: "VOTING",
        GAME_ENDED: "GAME_ENDED"
    }

    static AVAILABLE_DECKS = [
        {name: "Cartas do Peq", id: 'peq', totalCards: 21, deckPrefix: 'Peq'},
        {name: "Cartas de Nudes", id: 'nudes', totalCards: 70, deckPrefix: 'Nude'},
        {name: "Cartas de Museus Europeus", id: 'euro', totalCards: 35, deckPrefix: 'Euro'},
        {name: "Cartas de Dixit",  id:'dixit', totalCards: 257, deckPrefix: 'Dixit'},
    ]

    static POSSIBLE_VICTORY_CONDITIONS = [
        {name: 'Corrida dos 30 pontos', id: 'points-victory'},
        {name: 'Jogar até o baralho acabar', id: 'deck-victory'},
    ]


    constructor({name, hostPlayer}){
        this.createdAt = new Date()
        this.name = name
        // Uma sala nova sempre começa com WAITING_FOR_PLAYERS
        this.state = Room.States.WAITING_FOR_PLAYERS 
        this.players = [new RoomPlayer({user: hostPlayer})]
        this.host = hostPlayer
        this.turn = 1
        this.currentPlayerIndex = 0
        this.prompt = null
        this.selectedCardCount = 0
        this.results = []
        this.victory = "points-victory"
        this.votingCardsTurn = []
        this.winner = []
        this.minimumPlayersToStart = 2
        this.minimumCardsToStart = 50

        // Default possible decks and conditions to win :)
        this.availableDecks = Room.AVAILABLE_DECKS
        this.availableVictoryConditions = Room.POSSIBLE_VICTORY_CONDITIONS

        // Id of decks which have been selected so far :)
        this.selectedDecksIds =[Room.AVAILABLE_DECKS[0].id]

        // Populates the deck
        this.deck = []
        this.morto = []

    }

    isUserWithNameInRoom(name){
        return this.players.find((player) => {
            if(player.user.name == name){
                return player
            }    
        })
    }

    // Retorna o RoomPlayer relativo ao usuário
    getPlayerForUser(user) {
        return this.players && this.players.find((player) => {
            if (player.user.id == user.id) {
                return player
            }
        })
    }

    // O usuário dado está na sala?
    isUserInRoom(user) {
        if(this.getPlayerForUser(user))
        return Room
    }

    // Retorna a carta seleciona para o usuário 
    getSelectedCardForUser(user) {
        let player = this.getPlayerForUser(user)
        return player && player.selectedCard
    }

    // Seta a carta para o usuário 
    setSelectedCardForUser(user, card) {
        let player = this.getPlayerForUser(user)
        if (player) {
            player.selectedCard = card
            player.mySelectedCard = card
            player.hand.splice(player.hand.indexOf(card), 1)
            this.morto.push(card)
            console.log('setSelectedCardforUser = card', card)
        }
    }

    // Retorna o total de cartas selecionadas na sala
    getNumberOfSelectedCards() {
        var total = 0
        this.players.forEach((player) => {
            if (player.selectedCard) {
                total+=1
            }
        })
        return total
    }

    // Retorna a carta votada para o usuário 
    getVotedCardForUser(user) {
        let player = this.getPlayerForUser(user)
        return player && player.votedCard
    }

    // Vota na carta para o usuário 
    setVotedCardForUser(user, card) {
        let player = this.getPlayerForUser(user)
        if (player) {
            player.votedCard = card
        }
    }
    
    // A carta dada está disponível para votação?
    isCardAvailableForVoting(card) {
        return this.players.find((player) => player.selectedCard == card).length > 0
    }

    // Retorna o total de cartas votadas na sala
    getNumberOfVotedCards() {
        var total = 0
        this.players.forEach((player) => {
            if (player.votedCard) {
                total+=1
            }
        })
        return total
    }

    // Retorna o jogador atual
    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex]
    }

    // Retorna o total de cartas selecionadas
    getTotalOfSelectedCards() {
        return this.getSelectedDecks().reduce((total, deck) => total + deck.totalCards, 0)
    }

    // Retorna os decks selecionados com todas suas informacoes, não so os IDs
    getSelectedDecks() {
        return this.availableDecks.filter(deck => this.selectedDecksIds.indexOf(deck.id) != -1)
    }

}