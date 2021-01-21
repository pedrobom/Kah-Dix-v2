const { Model, DataTypes } = require('sequelize');
const User = require('./User');

class Room extends Model {
    static init(connection) {
        super.init({
            state: {
                type: DataTypes.STRING,
                defaultValue: "WAITING_FOR_PLAYERS"
            },
            name: DataTypes.STRING,
            turn: {
                type: DataTypes.INTEGER,
                defaultValue: 1
            },
            currentPlayerIndex: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            prompt: {
                type: DataTypes.STRING,
                defaultValue: null
            },
            selectedCardCount: {
                type: DataTypes.STRING,
                defaultValue: 0  
            },
            victory: DataTypes.STRING,
            votingCardsTurn: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                defaultValue: []  
            },
            winner: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                defaultValue: []  
            },
            minimumPlayersToStart: {
                type: DataTypes.INTEGER,
                defaultValue: 2  
            },
            minimumCardsToStart: {
                type: DataTypes.INTEGER,
                defaultValue: 50
            },
            selectedDecksIds: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                defaultValue: []
            },
            deck: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                defaultValue: []
            },
            morto: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                defaultValue: []
            },
            results: {
                type: DataTypes.STRING,
                get: function() {
                    return JSON.parse(this.getDataValue('results'));
                }, 
                set: function(val) {
                    return this.setDataValue('results', JSON.stringify(val));
                }
            }
        }, {
            sequelize: connection,
            tableName: 'rooms'
        })
    }

    static associate(models) {
        this.hasMany(models.RoomPlayer, { foreignKey: 'roomId', as: 'players' })
        this.hasMany(models.Socket, { foreignKey: 'roomId', as: 'socketsIds' })
        this.belongsTo(models.User, { foreignKey: 'hostId' })
    }

    static States = {
        WAITING_FOR_PLAYERS: "WAITING_FOR_PLAYERS",
        ONGOING_GAME: "ONGOING_GAME",
        PICKING_PROMPT: "PICKING_PROMPT",
        SELECTING_CARDS: "SELECTING_CARDS",
        VOTING: "VOTING",
        GAME_ENDED: "GAME_ENDED"
    }

    isUserWithNameInRoom(name){
        return this.getPlayers(
            {
                include: {
                    association: 'playerOwner',
                    where: { name: name }
                }
            }
        ).then( players => players && players.length > 0)
    }

    // Retorna o RoomPlayer relativo ao usuário
    getPlayerForUser(user) {
       return this.getPlayers(
            {
                where: { userId: user.id }
            }
        ).then(players => players && players[0])

        // return this.players && this.players.find((player) => {
        //     if (player.user.id == user.id) {
        //         return player
        //     }
        // })
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

module.exports = Room