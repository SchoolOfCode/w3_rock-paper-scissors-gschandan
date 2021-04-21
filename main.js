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
    icon: ["icon-comp_rock","icon-comp_paper","icon-comp_scis"]
};
let outcomes = ["won", "lost", "drew"];

function set_name(){
    player_name = document.getElementById("username").value;
    player.name = player_name;
    //if(!localStorage.getItem(player_name)) {
    //    let player = Object.create(player)
    //    player.name = player_name;
    //  } else {
    //    load_profile();
    //  }
}

function store_profile(){
}
function load_profile(){
}

function set_player_move(move_clicked){
    let icons = ["icon-rock","icon-paper","icon-scissors"];
    let chosen_move = icons.splice(move_clicked-1,1);
    for(i=0;i<2;i++){
        document.getElementById(icons[i]).style.opacity = "0.2";
    }
    icons.push(chosen_move);
    document.getElementById(chosen_move).style.color = "rgb(154, 206, 167)";
    player.move=move_clicked;
}

function set_computer_move(){
    computer.move=Math.floor(Math.random()*3)+1;
    document.getElementById("icon-computer").id=computer["icon"][computer.move-1];
}

function play_game(){
    if (player.move !== 0){
        set_computer_move();
        let result = win_check();
        console.log(player.results());
    }
}

function reset_icons(){
    let icons_reset = ["icon-rock","icon-paper","icon-scissors"];
    for(i=0;i<3;i++){
        document.getElementById(icons_reset[i]).style.color = "";
        document.getElementById(icons_reset[i]).style.opacity = "";
    }
    document.getElementById(computer["icon"][computer.move-1]).id = "icon-computer";
    player.move=null;
    computer.move=null;
}

function win_check(){
    player.games++;
    if (player.move === computer.move){
        player.draws++;
        return outcomes[2];
    } else if ((player.move - computer.move) % 3 == 1){    //1 beats 3, 2 beats 1, and 3 beats 2
        player.wins++;
        return outcomes[0];
    } else{
        player.losses++;
        return outcomes[1];
    }
}
