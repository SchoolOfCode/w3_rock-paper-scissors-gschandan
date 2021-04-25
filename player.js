// class player {
//     constructor(name, move) {
//         this.name = name;
//         this.wins = [];
//         this.draws = [];
//         this.losses = [];
//         this.games = [];
//         this.move = move;
//     }

//     winHistory() {
//         this.wins.push(1);
//         return(this.wins.length);
//     }

//     drawsHistory() {
//         this.wins.push(1);
//         return(this.wins.length);
//     }

//     lossesHistory() {
//         this.wins.push(1);
//         return(this.wins.length);
//     }

//     gamesHistory() {
//         this.wins.push(1);
//         return(this.wins.length);
//     }

//     reset() {
//         this.wins = [];
//         this.draws = [];
//         this.losses = [];
//         this.games = [];
//     }

//     check() {
//         return `${this.name}'s results over ${this.games.length} game(s) are: <br> ${this.wins.length} Wins , ${this.draws.length} Draws and ${this.losses.length} Losses.`;
//     }
// }
// for(var i = 0; i <= players.length; i++) {
//     if (username === players[i].name) {
//         currentPlayer = i;
//         console.log(i);
//     } else {
//         players.push(new player(username));
//         currentPlayer = players.length;
//     }
// }
// let players = [];
// let currentPlayer;