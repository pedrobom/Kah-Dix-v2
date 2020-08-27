abstract class State{

    name: string

    constructor(props){
        this.name = name
    }
    
    promptAndSubmit(): void {
        //write prompt and submit input clicking the Submit button
    }

    chooseCard(): void{
        // drag and drop card in Table
        // make card unique and traced back to player
    }

    voteBestCard(): void{
        // all players except current player, vote for best suiting card
    }

}