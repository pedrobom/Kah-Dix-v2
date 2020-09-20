module.exports = {

  '3players_prompt': {
    "myUserName": "pipo",
    "myHand": [
      "Nude59",
      "Nude3",
      "Nude30",
      "Nude9",
      "Nude54"
    ],
    "haveIVoted": null,
    "mySelectedCard": null,
    "name": "teste",
    "state": "PICKING_PROMPT",
    "turn": 1,
    "currentPlayerIndex": 0,
    "host": {
      "createdAt": "2020-09-20T14:12:07.930Z",
      "id": "1",
      "name": "pipo",
      "socketIds": [
        "OOwXNR8fPruynqs6AAAD"
      ]
    },
    "prompt": null,
    "selectedCardCount": 0,
    "results": [],
    "victory": "points-victory",
    "isDeckDixit": false,
    "isDeckEuro": false,
    "isDeckNude": true,
    "isDeckPeq": true,
    "votingCardsTurn": [],
    "players": [
      {
        "name": "pipo",
        "id": "1",
        "score": 0,
        "selectedCard": null,
        "votedCard": false,
        "isDisconnected": false
      },
      {
        "name": "papa",
        "id": "2",
        "score": 0,
        "selectedCard": null,
        "votedCard": false,
        "isDisconnected": false
      },
      {
        "name": "popo",
        "id": "3",
        "score": 0,
        "selectedCard": null,
        "votedCard": false,
        "isDisconnected": true
      }
    ],
    "winner": []
  },
  '3players_start': {
    "myUserName": "pim",
    "myHand": [
      "Nude28",
      "Peq17",
      "Dixit43",
      "Nude51",
      "Dixit27"
    ],
    "haveIVoted": null,
    "mySelectedCard": null,
    "name": "test",
    "state": "PICKING_PROMPT",
    "turn": 1,
    "currentPlayerIndex": 0,
    "host": {
      "createdAt": "2020-09-19T20:57:45.808Z",
      "id": "1",
      "name": "pim",
      "socketIds": [
        "ECKDnHZnfPiw3VkoAAAF"
      ]
    },
    "prompt": null,
    "selectedCardCount": 0,
    "results": [],
    "victory": "points-victory",
    "isDeckDixit": true,
    "isDeckEuro": true,
    "isDeckNude": true,
    "isDeckPeq": true,
    "votingCardsTurn": [],
    "players": [
      {
        "name": "dois",
        "score": 0,
        "selectedCard": null,
        "votedCard": false,
        "id": "2",
      },
      {
        "name": "pimpo",
        "score": 0,
        "id": "1",
        "selectedCard": null,
        "votedCard": false
      },
      {
        "name": "eu_mesmo",
        "score": 20,
        "selectedCard": null,
        "votedCard": false,
        "isDisconnected": true,
        "id": "3",
      }
    ],
    "winner": []
  },


  '3players_vote_me': {
    "myUserName": "pim",
    "myHand": [
      "Nude28",
      "Peq17",
      "Dixit43",
      "Nude51",
      "Dixit27"
    ],
    "haveIVoted": null,
    "mySelectedCard": null,
    "name": "test",
    "state": "VOTING",
    "turn": 1,
    "currentPlayerIndex": 1,
    "host": {
      "createdAt": "2020-09-19T20:57:45.808Z",
      "id": "1",
      "name": "pim",
      "socketIds": [
        "ECKDnHZnfPiw3VkoAAAF"
      ]
    },
    "prompt": "Quero ver usar desodorante no inverno",
    "selectedCardCount": 0,
    "results": [],
    "victory": "points-victory",
    "isDeckDixit": true,
    "isDeckEuro": true,
    "isDeckNude": true,
    "isDeckPeq": true,
    "votingCardsTurn": [],
    "players": [
      {
        "name": "dois",
        "score": parseInt(Math.random() * 30),
        "selectedCard": null,
        "votedCard": true,
        "isDisconnected": true,
        "id": "2",
      },
      {
        "name": "pimpo",
        "score": parseInt(Math.random() * 20),
        "id": "1",
        "selectedCard": null,
        "votedCard": false
      },
      {
        "name": "eu_mesmo",
        "score": parseInt(Math.random() * 10),
        "selectedCard": null,
        "votedCard": true,
        "id": "3",
      }
    ],
    "winner": []
  },

  '3players_vote_other': {
    "myUserName": "pim",
    "myHand": [
      "Nude28",
      "Peq17",
      "Dixit43",
      "Nude51",
      "Dixit27"
    ],
    "haveIVoted": null,
    "mySelectedCard": null,
    "name": "test",
    "state": "VOTING",
    "turn": 1,
    "currentPlayerIndex": 0,
    "host": {
      "createdAt": "2020-09-19T20:57:45.808Z",
      "id": "1",
      "name": "pim",
      "socketIds": [
        "ECKDnHZnfPiw3VkoAAAF"
      ]
    },
    "prompt": "Gato pardo é sem cor",
    "selectedCardCount": 0,
    "results": [],
    "victory": "points-victory",
    "isDeckDixit": true,
    "isDeckEuro": true,
    "isDeckNude": true,
    "isDeckPeq": true,
    "votingCardsTurn": [],
    "players": [
      {
        "name": "dois",
        "score": parseInt(Math.random() * 30),
        "selectedCard": null,
        "votedCard": true,
        "isDisconnected": true,
        "id": "2",
      },
      {
        "name": "pimpo",
        "score": parseInt(Math.random() * 20),
        "id": "1",
        "selectedCard": null,
        "votedCard": false
      },
      {
        "name": "eu_mesmo",
        "score": parseInt(Math.random() * 10),
        "selectedCard": null,
        "votedCard": true,
        "id": "3",
      }
    ],
    "winner": []
  },

  '3players_selecting': {
    "myUserName": "pipo",
    "myHand": [
      "Peq6",
      "Nude21",
      "Nude57",
      "Nude58",
      "Euro13"
    ],
    "haveIVoted": null,
    "mySelectedCard": "Peq9",
    "name": "teste",
    "state": "SELECTING_CARDS",
    "turn": 1,
    "currentPlayerIndex": 0,
    "host": {
      "createdAt": "2020-09-20T14:17:12.930Z",
      "id": "1",
      "name": "pipo",
      "socketIds": [
        "2qWtr06DDWAd_pLlAACh"
      ]
    },
    "prompt": "quero fazer bjbj",
    "selectedCardCount": 2,
    "results": [],
    "victory": "points-victory",
    "isDeckDixit": false,
    "isDeckEuro": true,
    "isDeckNude": true,
    "isDeckPeq": true,
    "votingCardsTurn": [],
    "players": [
      {
        "name": "snadu",
        "id": "2",
        "score": 0,
        "selectedCard": true,
        "votedCard": false,
        "isDisconnected": false
      },
      {
        "name": "pipo",
        "id": "1",
        "score": 0,
        "selectedCard": true,
        "votedCard": false,
        "isDisconnected": false
      },
      {
        "name": "jonas",
        "id": "3",
        "score": 0,
        "selectedCard": false,
        "votedCard": false,
        "isDisconnected": false
      }
    ],
    "winner": []
  },

  '3players_vote_results': {
    "myUserName": "jonas",
    "myHand": [
        "Nude61",
        "Peq4",
        "Euro34",
        "Euro30",
        "Peq13"
    ],
    "haveIVoted": null,
    "mySelectedCard": "Nude39",
    "name": "teste",
    "state": "PICKING_PROMPT",
    "turn": 6,
    "currentPlayerIndex": 2,
    "host": {
        "createdAt": "2020-09-20T14:17:12.930Z",
        "id": "1",
        "name": "pipo",
        "socketIds": [
            "iEOl79_9_BNRrtwUAAD6"
        ]
    },
    "prompt": null,
    "selectedCardCount": 0,
    "results": [
        {
            "turn": 1,
            "turnPlayer": "snadu",
            "turnPrompt": "quero fazer bjbj",
            "turnPlayerCard": "Peq14",
            "turnPlayerScore": 0,
            "players": [
                {
                    "name": "snadu",
                    "votedCard": null,
                    "selectedCard": "Peq14",
                    "turnScore": 0
                },
                {
                    "name": "pipo",
                    "votedCard": "Nude55",
                    "selectedCard": "Peq9",
                    "turnScore": 1
                },
                {
                    "name": "jonas",
                    "votedCard": "Peq9",
                    "selectedCard": "Nude55",
                    "turnScore": 1
                }
            ]
        },
        {
            "turn": 2,
            "turnPlayer": "pipo",
            "turnPrompt": "TETSE",
            "turnPlayerCard": "Nude38",
            "turnPlayerScore": 3,
            "players": [
                {
                    "name": "snadu",
                    "votedCard": "Peq12",
                    "selectedCard": "Peq10",
                    "turnScore": 0
                },
                {
                    "name": "pipo",
                    "votedCard": null,
                    "selectedCard": "Nude38",
                    "turnScore": 3
                },
                {
                    "name": "jonas",
                    "votedCard": "Nude38",
                    "selectedCard": "Peq12",
                    "turnScore": 4
                }
            ]
        },
        {
            "turn": 3,
            "turnPlayer": "jonas",
            "turnPrompt": "Okey tá aqui",
            "turnPlayerCard": "Nude6",
            "turnPlayerScore": 3,
            "players": [
                {
                    "name": "snadu",
                    "votedCard": "Nude21",
                    "selectedCard": "Euro6",
                    "turnScore": 0
                },
                {
                    "name": "pipo",
                    "votedCard": "Nude6",
                    "selectedCard": "Nude21",
                    "turnScore": 4
                },
                {
                    "name": "jonas",
                    "votedCard": null,
                    "selectedCard": "Nude6",
                    "turnScore": 3
                }
            ]
        },
        {
            "turn": 4,
            "turnPlayer": "snadu",
            "turnPrompt": "venceri",
            "turnPlayerCard": "Peq20",
            "turnPlayerScore": 3,
            "players": [
                {
                    "name": "snadu",
                    "votedCard": null,
                    "selectedCard": "Peq20",
                    "turnScore": 3
                },
                {
                    "name": "pipo",
                    "votedCard": "Peq20",
                    "selectedCard": "Euro13",
                    "turnScore": 4
                },
                {
                    "name": "jonas",
                    "votedCard": "Euro13",
                    "selectedCard": "Nude3",
                    "turnScore": 0
                }
            ]
        },
        {
            "turn": 5,
            "turnPlayer": "pipo",
            "turnPrompt": "Deixa comigo",
            "turnPlayerCard": "Nude57",
            "turnPlayerScore": 0,
            "players": [
                {
                    "name": "snadu",
                    "votedCard": "Nude57",
                    "selectedCard": "Peq18",
                    "turnScore": 2
                },
                {
                    "name": "pipo",
                    "votedCard": null,
                    "selectedCard": "Nude57",
                    "turnScore": 0
                },
                {
                    "name": "jonas",
                    "votedCard": "Nude57",
                    "selectedCard": "Nude39",
                    "turnScore": 2
                }
            ]
        }
    ],
    "victory": "points-victory",
    "isDeckDixit": false,
    "isDeckEuro": true,
    "isDeckNude": true,
    "isDeckPeq": true,
    "votingCardsTurn": [
        "Peq18",
        "Nude39",
        "Nude57"
    ],
    "players": [
        {
            "name": "snadu",
            "id": "2",
            "score": 5,
            "selectedCard": null,
            "votedCard": false,
            "isDisconnected": false
        },
        {
            "name": "pipo",
            "id": "1",
            "score": 12,
            "selectedCard": null,
            "votedCard": false,
            "isDisconnected": false
        },
        {
            "name": "jonas",
            "id": "3",
            "score": 10,
            "selectedCard": null,
            "votedCard": false,
            "isDisconnected": false
        }
    ],
    "winner": []
}

}