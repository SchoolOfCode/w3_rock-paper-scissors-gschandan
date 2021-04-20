let player = {
    name: "",
    move: 0,
    disp_move: "",
    wins: 0,
    draws: 0,
    losses: 0,
    games: 0,
    results: function(){
        return `${this.name}'s results over ${this.games} game(s) are: ${this.wins} Wins , ${this.draws} Draws and ${this.losses} Losses.`;
    }
};
let computer ={
    move: 0,
    disp_move: ""
};
let options = {  
    rock: 1,
    paper: 2,
    scissors: 3,
    disp: ["","rock","paper","scissors"]
};
let outcomes = ["won", "lost", "drew"];

player.name=prompt("Please enter your name:");
player.move=options[prompt("Rock, scissors or paper?:").toLowerCase()];
player.disp_move = options.disp[player.move];      //convert integer representation of move to a string
computer.move=Math.floor(Math.random()*2)+1;      //random number between 1 and 3
computer.disp_move = options.disp[computer.move];  //convert integer representation of move to a string
let game=win_check();
console.log(`${player.name} played ${player.disp_move} against ${computer.disp_move}, and ${game}.`);
console.log(player.results());


function win_check(){
    player.games++;
    //1 beats 3, 2 beats 1, and 3 beats 2
    if (player.move === computer.move){
        player.draws++;
        return outcomes[2];
    } else if ((player.move - computer.move) % 3 == 1){
        player.wins++;
        return outcomes[0];
    } else{
        player.losses++;
        return outcomes[1];
    }
}
