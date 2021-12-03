import GameManager from '../../GameManager';

export default function listener(socket) {
  return () => {
    GameManager
      .getInstance()
      .removePlayer("QuickWord", { nickname: "Dylan" });

    console.log("LEAVE: ", GameManager.getInstance().state.QuickWord);
  }
}
