export default function AllCards () {
    const Allcards = []
        for (var i = 1; i <= 21; i++){
            let card = {cardTitle: `card${i}`, src: require(`../assets/PeqDeck/card${i}.png`)}
            Allcards.push(card)
            
        }
    return Allcards
   // {cardTitle: 'card1', src: require('../assets/DixitDeck/card1.jpg')},
}
