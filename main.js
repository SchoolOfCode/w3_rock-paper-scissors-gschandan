let player = {
    name: "Anonymous Player",
    move: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    games: 0,
    results: function(){
        return `${this.name}'s results over ${this.games} game(s) are: <br> ${this.wins} Wins , ${this.draws} Draws and ${this.losses} Losses.`;
    }

};
let computer ={
    move: 0,
    icon: ["icon-comp_rock","icon-comp_paper","icon-comp_scis"]
};
let outcomes = ["won", "lost", "drew"];

//DOM Event listeners
const rockElement = document.getElementById("icon-rock");
const paperElement = document.getElementById("icon-paper");
const scissorsElement = document.getElementById("icon-scissors");
const retryElement = document.getElementById("icon-retry");
const helpElement = document.getElementById("icon-help");
const listElement = document.getElementById("icon-list"); //list(statsboard)


//DOM Handlers
rockElement.addEventListener('click', function(){ set_player_move(1);});
paperElement.addEventListener('click', function(){ set_player_move(2);});
scissorsElement.addEventListener('click', function(){ set_player_move(3);});
retryElement.addEventListener('click', reset_icons);
helpElement.addEventListener('click', display_help);//TODO
listElement.addEventListener('click', display_statsboard);//TODO

function set_player_move(move_clicked){
    let icons = ["icon-rock","icon-paper","icon-scissors"];
    let chosen_move = icons.splice(move_clicked-1,1);
    for(i=0;i<2;i++){
        document.getElementById(icons[i]).style.opacity = "0.2"; //make the other moves more transparent
    }
    icons.push(chosen_move);
    player.move=move_clicked;
    play_game();
}

function set_computer_move(){
    computer.move=Math.floor(Math.random()*3)+1;
    document.getElementById("icon-computer").id=computer["icon"][computer.move-1];
}

function play_game(){
    if (player.move !== 0 ){
        set_computer_move();
        let result = win_check();
        console.log(player.results());
        document.getElementById("res").innerHTML = player.results();
    }
}

function reset_icons(){
    let icons_reset = document.getElementsByClassName("player_move");
    for(i=0;i<3;i++){
        icons_reset[i].style.color = "";
        icons_reset[i].style.opacity = "";
    }
    document.getElementById(computer["icon"][computer.move-1]).id = "icon-computer";
    player.move=0;
    computer.move=0;
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
