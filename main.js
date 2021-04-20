let player = {
    name: "",
    move: 0,
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
};
let outcomes = ["won", "lost", "drew"];

function set_player_move(move_clicked){
    let icons = ["icon-rock","icon-paper","icon-scissors"];
    let chosen_move = icons.splice(move_clicked-1,1);
    for(i=0;i<2;i++){
        document.getElementById(icons[i]).style.opacity = "0.2";
    }
    icons.push(chosen_move);
    document.getElementById(chosen_move).style.color = "rgb(128, 240, 162)";
    document.getElementById(chosen_move).style.color = "rgb(128, 240, 162)";
    document.getElementById(chosen_move).style.color = "rgb(128, 240, 162)";
    
    player.move=move_clicked;
    console.log(player.move,computer.move);
    
    //reset(icons);
}
computer.move=Math.floor(Math.random()*2)+1;      //random number between 1 and 3

function reset(icons){
    for(i=0;i<3;i++){
        document.getElementById(icons[i]).style.color = "";
        document.getElementById(icons[i]).style.opacity = "";
    }
}

//player.name=prompt("Please enter your name:");
//document.getElementById("name").innerHTML = player.name;
//player.move=options[prompt("Rock, scissors or paper?:").toLowerCase()];

//convert integer representation of move to a string
//let game=win_check();
//console.log(`${player.name} played ${player.disp_move} against ${computer.disp_move}, and ${game}.`);
//console.log(player.results());


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
