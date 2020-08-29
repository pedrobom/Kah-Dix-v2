export default function AllCards () {
    const Allcards = []
        for (var i = 1; i < 97; i++){
            let card = {cardTitle: `card${i}`, src: require(`../assets/DixitDeck/card${i}.jpg`)}
            Allcards.push(card)
        }
    return Allcards
   // {cardTitle: 'card1', src: require('../assets/DixitDeck/card1.jpg')},
}
