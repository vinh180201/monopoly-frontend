import { Dispatch } from "redux";
import { updatePlayerMoney, updatePlayerPosition, skipPlayerTurn } from "@/redux/features/playerSlice";
import { setLandOwner, addHouseToLand } from "@/redux/features/landSlice";

export const handleTax = (dispatch: Dispatch, currentPlayer: any, onQuestion: any, handleNextTurn: any) => {
  console.log(`👣 Player ${currentPlayer.id} đi qua ô thuế. Trừ $200.`);
  dispatch(updatePlayerMoney({ playerId: currentPlayer.id, amount: -200 }));
  onQuestion(
    `👣 Player ${currentPlayer.id} đã đi vào ô thuế và bị trừ $200.`,
    () => {},
    () => {},
    true
  );

  setTimeout(() => {
    onQuestion("", () => {}, () => {});
    handleNextTurn();
  }, 1500);
};

export const handleChance = (dispatch: Dispatch, currentPlayer: any, onQuestion: any, handleNextTurn: any) => {
  console.log(`👣 Player ${currentPlayer.id} đi qua ô cơ hội. Cộng $30.`);
  dispatch(updatePlayerMoney({ playerId: currentPlayer.id, amount: 30 }));
  onQuestion(
    `👣 Player ${currentPlayer.id} đã đi vào ô cơ hội và được cộng $30.`,
    () => {},
    () => {},
    true
  );

  setTimeout(() => {
    onQuestion("", () => {}, () => {});
    handleNextTurn();
  }, 1500);
};

export const handleGoToJail = (dispatch: Dispatch, currentPlayer: any, onQuestion: any, handleNextTurn: any) => {
  console.log(
    `👣 Player ${currentPlayer.id} đi vào ô "Vào Tù". Chuyển đến ô "Nhà Tù" và mất 1 lượt.`
  );
  dispatch(updatePlayerPosition({ playerId: currentPlayer.id, position: 12 }));
  dispatch(skipPlayerTurn({ playerId: currentPlayer.id, turns: 1 }));
  onQuestion(
    `👮 Player ${currentPlayer.id} đã vào ô "Nhà Tù".`,
    () => {},
    () => {},
    true
  );

  setTimeout(() => {
    onQuestion("", () => {}, () => {});
    handleNextTurn();
  }, 1500);
};