const ALL_CARDS = GenerateAllCards()

function GenerateAllCards () {
    const Allcards = []
        for (var i = 1; i <= 21; i++){
            let card = {cardTitle: `Peq${i}`, src: require(`../assets/Cards/PeqDeck/peq${i}.jpg`)}
            Allcards.push(card)
        }
        for (var i = 1; i <= 257; i++){
            let card = {cardTitle: `Dixit${i}`, src: require(`../assets/Cards/DixitDeck/dixit${i}.jpg`)}
            Allcards.push(card)
        }
        for (var i = 1; i <= 70; i++){
            let card = {cardTitle: `Nude${i}`, src: require(`../assets/Cards/NudeDeck/Nude (${i}).jpg`)}
            Allcards.push(card)
        }
        for (var i = 1; i <= 35; i++){
            let card = {cardTitle: `Euro${i}`, src: require(`../assets/Cards/EuroMuseumDeck/Euro (${i}).jpg`)}
            Allcards.push(card)
        }
    return Allcards
   // {cardTitle: 'card1', src: require('../assets/DixitDeck/card1.jpg')},
}

export default function AllCards() {
    return ALL_CARDS
}

export const getCardInfo = cardInput => ALL_CARDS.find(card => card.cardTitle === cardInput)