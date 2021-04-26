//DOM Event listeners
const rockElement = document.getElementById("icon-rock");
const paperElement = document.getElementById("icon-paper");
const scissorsElement = document.getElementById("icon-scissors");
const retryElement = document.getElementById("icon-retry");
const helpElement = document.getElementById("icon-help");
const listElement = document.getElementById("icon-list"); //list == statsboard
const usernameElement = document.getElementById("username");
const helpImageElement = document.getElementById("help_overlay");

//DOM Handlers
rockElement.addEventListener('click', function(){ set_player_move(0);});
paperElement.addEventListener('click', function(){ set_player_move(1);});
scissorsElement.addEventListener('click', function(){ set_player_move(2);});
retryElement.addEventListener('click', reset_icons);
helpElement.addEventListener('click', display_help);
helpImageElement.addEventListener('click', hide_help);

let click_counter = 0;
listElement.addEventListener('click', function(){
    click_counter++;
    display_statsboard(click_counter);
});
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
    high_Score(){
        return [this.username, this.wins];
    }
};
//Container class for all the players
class Players{
    constructor(){
        this.players = [];
        this.leaders = [];
    }
    checkPlayerExists(username){
        return this.players.some(function(elem){
           return elem.username === username;
        });
    }
    newPlayer(username){
        let currentPlayer = new Human(username,null,0,0,0,0);
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
            id = this.playerID(username);
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
    playerID(username){
        return this.players.findIndex(function(elem){
            return elem.username === username;});
    }
    leaderBoard(){
        for (let i = 0; i <this.players.length; i++){
            this.leaders.push([this.players[i].username, this.players[i].wins]);
        }
        return this.leaders.sort(function(a,b){
            return b[1]-a[1];
        });
    }
    clearLeaderBoard(){
        return this.leaders = [];
    }
}
let rps_players = new Players(); //create a container for a list of humans on loading the page
let computer ={
    move: null,
    icon: ["icon-comp_rock","icon-comp_paper","icon-comp_scis"]
};
let outcomes = ["drew","won", "lost"];

function set_player_move(move_clicked){
    let username = usernameElement.value;
    console.log(username);
    rps_players.loadPlayer("1337gamer"); //leaderboard leader
    rps_players.players[0].wins = 999;
    rps_players.players[0].games = 999;

    let [currentPlayer,id] = rps_players.loadPlayer(username);

    let icons = ["icon-rock","icon-paper","icon-scissors"];
    let chosen_move = icons.splice(move_clicked,1);
    for(i=0;i<2;i++){
        document.getElementById(icons[i]).style.opacity = "0.2"; //make the other moves more transparent
    }
    icons.push(chosen_move);
    currentPlayer.move=move_clicked;
    play_game(currentPlayer);
}

function set_computer_move(){
    computer.move=Math.floor(Math.random()*3);
    document.getElementById("icon-computer").id=computer["icon"][computer.move];
}

function play_game(currentPlayer){
    if (currentPlayer.move !== null && computer.move === null){
        set_computer_move();
        let result = win_check(currentPlayer);
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
    if (computer.move !== null){
        document.getElementById(computer["icon"][computer.move]).id = "icon-computer";
    }
    currentPlayer.move=null;
    computer.move=null;
}

function win_check(currentPlayer){
    currentPlayer.games++;
    if (currentPlayer.move === computer.move){
        currentPlayer.draws++;
        return outcomes[0];
    } else if (currentPlayer.move == 0 && computer.move == 2){ //Rock vs Scissors
        currentPlayer.wins++;
        return outcomes[1];
    } else if (currentPlayer.move == 1 && computer.move == 0){ //Paper vs Rock
        currentPlayer.wins++;
        return outcomes[1];
    }else if (currentPlayer.move == 2 && computer.move == 1){ //Scissors vs Paper
        currentPlayer.wins++;
        return outcomes[1];
    } else{
        currentPlayer.losses++;
        return outcomes[2];
    }
}

function display_help(){
    document.getElementById("game_container").style.display = "none";
    document.getElementById("help_overlay").style.display = "flex";
}
function hide_help(){
    document.getElementById("game_container").style.display = "flex";
    document.getElementById("help_overlay").style.display = "none";
}

function display_statsboard(click_counter){

    let leaders = document.getElementsByClassName("stats");
    if (click_counter % 2){
        document.getElementById("leaderboard_container").style.display = "flex";
        let current_leaders = rps_players.leaderBoard();
        for(i=0;i<rps_players.leaders.length;i++){
            leaders[i].innerHTML = `${i+1}. ${current_leaders[i][0]}  with ${current_leaders[i][1]} wins`;
        }
    } else{
        document.getElementById("leaderboard_container").style.display = "none";
        rps_players.clearLeaderBoard();
    }



}