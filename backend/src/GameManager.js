export default class GameManager {
  static instance;

  state = {
    MagicNumber: { players: [] },
    QuickWord: { players: [] },
    WordAndFurious: { players: [] },
  };

  static getInstance() {
    if (!GameManager.instance) {
      GameManager.instance = new GameManager();
    }

    return GameManager.instance;
  }

  addPlayer(game, player) {
    const { players } = this.state[game];
    players.push(player);

    // If the game is full, notify players that the game started
    if (players.length >= 2) {
      players.forEach((player) => {
        player.socket.emit("game::start");
      });
    }
  }

  removePlayer(game, player) {
    const { players } = this.state[game];

    this.state[game].players = players
      .filter(({ nickname }) => nickname !== player.nickname);
  }
}
