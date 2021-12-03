import GameManager from '../../GameManager';

export default function listener(socket) {
  return () => {
    GameManager
      .getInstance()
      .addPlayer("QuickWord", { nickname: "Dylan", socket });

    console.log("JOIN: ", GameManager.getInstance().state.QuickWord);
  }
}
