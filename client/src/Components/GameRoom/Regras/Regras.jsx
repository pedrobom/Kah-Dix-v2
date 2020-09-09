import React from 'react'
import './Regras.css'

function Regras (){
    const expandRules = e =>{
        e.preventDefault()
        const regrasExpanded = document.querySelector('.background-regras-button')
        
        regrasExpanded.style.display = "flex"

        regrasExpanded.classList.remove('hide')
        regrasExpanded.classList.add('show')
    }

    const closeRules = e => {
        e.preventDefault()
        const regrasExpanded = document.querySelector('.background-regras-button')
        
        regrasExpanded.style.display = "none"
        regrasExpanded.classList.remove('show')
        regrasExpanded.classList.add('hide')

    }

    return (
        <>
        <a onClick={(e) => {expandRules(e)}}>Regras do Jogo</a>
        <div className="background-regras-button">
            <div className="Regras-content">
            <h1>COMO JOGAR:</h1>
            <p>Cada jogador recebe cinco cartas.</p>
            <p>Um jogador aleatório dará início ao jogo escrevendo uma frase que remeta a carta da rodada,
                o objetivo desse jogador é garantir que pelo menos uma pessoa entenda 
                a sua proposta mas que também engane pelo menos uma outra, ganhando assim 3 pontos.</p>
            <p>Caso todos os jogadores descubram qual é a carta do jogador da rodada,
                todos ganham 2 pontos menos ele.</p>
                <p>Caso ninguém vote na carta do jogador da rodada, ele também não pontua.</p>
                <p></p>
                <p>Os outros jogadores devem escolher cartas que façam alusão à frase do jogador da rodada,
                    tentando enganar os outros jogadores a escolherem sua carta.
                </p>
                <p>Cada voto enganado é mais 1 ponto para o jogador que colocou essa carta.</p>

                <h2>CONDIÇÔES DE VITÓRIA:</h2>
                <p>As condições de vitória são definidas no início de cada partida, podendo ser Corrida de Pontos ou Jogar até acabar o baralho.</p>
                <p>Em Corrida de pontos o primeiro jogador a atingir 30 pontos torna-se o vencedor.</p>
                <p>Jogar até acabar o baralho significa que quando não houverem mais cartas suficientes no baralho,
                    o jogador que possuir mais pontos torna-se o vencedor.</p>
                    <button onClick={(e) => {closeRules(e)}}>FECHAR</button>
            </div> 
            
        </div>           
        </>

    )     
}

export default React.memo(Regras)