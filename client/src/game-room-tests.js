module.exports = {

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


    '3players_vote': {
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
      }

}