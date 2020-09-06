export default function AllCards () {
    const Allcards = []
        for (var i = 1; i <= 21; i++){
            let card = {cardTitle: `Peq${i}`, src: require(`../assets/Cards/PeqDeck/Peq (${i}).png`)}
            Allcards.push(card)
        }
        for (var i = 1; i <= 97; i++){
            let card = {cardTitle: `Dixit${i}`, src: require(`../assets/Cards/DixitDeck/Dixit (${i}).jpg`)}
            Allcards.push(card)
        }
    return Allcards
   // {cardTitle: 'card1', src: require('../assets/DixitDeck/card1.jpg')},
}
