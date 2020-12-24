import React, {useState, useEffect} from 'react';
import './App.css'
import socket from '../Components/socket'

import { TouchBackend } from 'react-dnd-touch-backend'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {isMobile} from 'react-device-detect'

import { Redirect, BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Join from "../Components/Join/Join.js"
import GameRoom from "../Components/GameRoom/GameRoom.jsx"
import RotatePhoneIcon from '../assets/icons/rotate_phone.svg'

import SessionContext from "../Components/SessionContext"
import DragPreview from '../Components/DragPreview/DragPreview'


export default (props) => {   
    const [session, setSession] = useState(null);
    const value = { session, setSession };
    const mock = {
        "user": {
          "id": 493,
          "updatedAt": "2020-12-22T17:08:56.991Z",
          "createdAt": "2020-12-22T17:08:56.991Z",
          "name": null
        },
        "roomData": {
          "myUserName": "pipo",
          "myHand": [
            "Peq19",
            "Euro16",
            "Euro26",
            "Peq13",
            "Peq5"
          ],
          "haveIVoted": null,
          "mySelectedCard": null,
          "name": "oier",
          "state": "VOTING",
          "turn": 2,
          "currentPlayerIndex": 0,
          "host": {
            "id": 489,
            "name": "oi",
            "createdAt": "2020-12-22T17:05:07.674Z",
            "updatedAt": "2020-12-22T17:09:24.210Z"
          },
          "prompt": "olé rsrs",
          "selectedCardCount": 8,
          "results": [
            {
              "turn": 1,
              "turnPlayer": "pipo",
              "turnPrompt": "Pipo e isso rsrs que frase linda hein",
              "turnPlayerCard": "Nude66",
              "turnPlayerScore": 0,
              "players": [
                {
                  "name": "pipo",
                  "votedCard": null,
                  "selectedCard": "Nude54",
                  "turnScore": 0
                },
                {
                  "name": "hey",
                  "votedCard": "Nude55",
                  "selectedCard": "Nude55",
                  "turnScore": 0
                },
                {
                  "name": "yolo",
                  "votedCard": "Nude66",
                  "selectedCard": "Nude65",
                  "turnScore": 2
                },
                {
                  "name": "lucastin",
                  "votedCard": "Nude62",
                  "selectedCard": "Nude61",
                  "turnScore": 2
                },
                {
                  "name": "heroku",
                  "votedCard": "Nude64",
                  "selectedCard": "Nude62",
                  "turnScore": 2
                },
                {
                  "name": "guigo",
                  "votedCard": "Nude63",
                  "selectedCard": "Nude60",
                  "turnScore": 2
                }
              ]
            }],
          "victory": "points-victory",
          "availableDecks": [
            {
              "name": "Cartas do Peq",
              "id": "peq",
              "totalCards": 21,
              "deckPrefix": "Peq"
            },
            {
              "name": "Cartas de Nudes",
              "id": "nudes",
              "totalCards": 70,
              "deckPrefix": "Nude"
            },
            {
              "name": "Cartas de Museus Europeus",
              "id": "euro",
              "totalCards": 35,
              "deckPrefix": "Euro"
            },
            {
              "name": "Cartas de Dixit",
              "id": "dixit",
              "totalCards": 257,
              "deckPrefix": "Dixit"
            }
          ],
          "availableVictoryConditions": [
            {
              "name": "Corrida dos 30 pontos",
              "id": "points-victory"
            },
            {
              "name": "Jogar até o baralho acabar",
              "id": "deck-victory"
            }
          ],
          "minimumCardsToStart": 50,
          "minimumPlayersToStart": 2,
          "selectedDecksIds": [
            "peq",
            "euro"
          ],
          "votingCardsTurn": [
            'Peq2',
            'Dixit2',
            'Dixit3',
            'Dixit4',
            'Dixit5',
            'Dixit6',
            'Dixit7',
            'Dixit8',
          ],
          "players": [
            {
              "name": "pipo",
              "id": 493,
              "score": 0,
              "selectedCard": null,
              "votedCard": false,
              "isDisconnected": false
            },
            {
              "name": "oi",
              "id": 489,
              "score": 0,
              "selectedCard": null,
              "votedCard": false,
              "isDisconnected": false
            }
          ],
          "winner": []
        }
      };

    useEffect(() => {

        console.log("Escutando mudanças da minha sessão!")
        let onSessionData = (sessionData) => {
            console.log("Dados de sessão atualizados!", sessionData)
              setSession( sessionData || {})
            //  setSession({ "user": null, "roomData": null })
        }

        socket.on('sessionData', onSessionData)

        // return () => {
        //     socket.removeListener('sessionData', onSessionData)
        // }
    }, [])

    // Esperar a sessão carregar para mostrar o jogo
    // TODO: fazer uma tela de carregar!
    // if (!session || !session.user) {
        // return null
    // }

    return <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <SessionContext.Provider value={value}>
        <div className='test'>Oi</div>
            { isMobile ? 
                <>
                    <DragPreview/>
                <div className="mobile-orientation-notice-overlay" hidden={!isMobile}>
                    <h1>Por favor jogue com celular<br></br> ou tablet deitado :)</h1>
                    <img src={RotatePhoneIcon} />
                </div>
                </>
                : ''
                }
            <Router>
                <Switch>
                    <Route path="/" exact component={Join} />
                    <Route path="/GameRoom/:roomName" exact component={GameRoom} />
                    <Redirect from="*" to="/" />
                </Switch>
            </Router>
        </SessionContext.Provider>
    </DndProvider>

}