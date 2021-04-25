//constructor class for the human players
class Human {
    constructor(username, move,wins,draws,losses,games){
        this.username = username;
        this.move = move;
        this.wins = wins;
        this.draws = draws;
        this.losses = losses;
        this.games = games;
    }
    results(){
        return `${this.username}'s results over ${this.games} game(s) are: <br> ${this.wins} Wins , ${this.draws} Draws and ${this.losses} Losses.`;
    }
};
//Container class for all the players
class Players{
    constructor(){
        this.players = [];
    }
    checkPlayerExists(username){
        return this.players.some(function(elem){
           return elem.username === username;
        });
    }
    newPlayer(username){
        let currentPlayer = new Human(username,0,0,0,0,0);
        this.players.push(currentPlayer);
        return currentPlayer;
    }
    loadPlayer(username){
        let currentPlayer;
        let id;
        if (this.checkPlayerExists(username)){
            currentPlayer = this.players.find(function(elem){
                return elem.username === username;
            });
            id = this.players.findIndex(function(elem){
                return elem.username === username;
            });
        } else{
            currentPlayer = this.newPlayer(username);
            id = this.players.length -1; //0 indexed array of players
        }
        return [currentPlayer, id];
    }
    get numberPlayers(){
        return this.players.length;
    }
    get everyPlayer(){
        return this.players;
    }
}
let rps_players = new Players(); //create a list of humans on loading the page
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
const listElement = document.getElementById("icon-list"); //list == statsboard
const usernameElement = document.getElementById("username");


//DOM Handlers
rockElement.addEventListener('click', function(){ set_player_move(1);});
paperElement.addEventListener('click', function(){ set_player_move(2);});
scissorsElement.addEventListener('click', function(){ set_player_move(3);});
retryElement.addEventListener('click', reset_icons);
helpElement.addEventListener('click', display_help);//TODO
listElement.addEventListener('click', display_statsboard);//TODO


function set_player_move(move_clicked){
    let username = usernameElement.value;
    rps_players.loadPlayer("1337gamer"); //leaderboard leader
    rps_players.players[0].wins = 999;
    rps_players.players[0].games = 999;

    let [currentPlayer,id] = rps_players.loadPlayer(username);

    let icons = ["icon-rock","icon-paper","icon-scissors"];
    let chosen_move = icons.splice(move_clicked-1,1);
    for(i=0;i<2;i++){
        document.getElementById(icons[i]).style.opacity = "0.2"; //make the other moves more transparent
    }
    icons.push(chosen_move);
    currentPlayer.move=move_clicked;
    play_game(currentPlayer);
}

function set_computer_move(){
    computer.move=Math.floor(Math.random()*3)+1;
    document.getElementById("icon-computer").id=computer["icon"][computer.move-1];
}

function play_game(currentPlayer){
    if (currentPlayer.move !== 0 && computer.move == 0){
        set_computer_move();
        let result = win_check(currentPlayer);
        console.log(currentPlayer.results());
        document.getElementById("curr_res").innerHTML = `You ${result}!`;
        document.getElementById("tot_res").innerHTML = currentPlayer.results();
    }
}

function reset_icons(currentPlayer){
    let icons_reset = document.getElementsByClassName("player_move");
    for(i=0;i<3;i++){
        icons_reset[i].style.color = "";
        icons_reset[i].style.opacity = "";
    }
    document.getElementById(computer["icon"][computer.move-1]).id = "icon-computer";
    currentPlayer.move=0;
    computer.move=0;
}

function win_check(currentPlayer){
    currentPlayer.games++;
    if (currentPlayer.move === computer.move){
        currentPlayer.draws++;
        return outcomes[2];
    } else if ((currentPlayer.move - computer.move) % 3 == 1){    //1 beats 3, 2 beats 1, and 3 beats 2
        currentPlayer.wins++;
        return outcomes[0];
    } else{
        currentPlayer.losses++;
        return outcomes[1];
    }
}

function display_help(){

}

function display_statsboard(){

}