import { Dispatch } from "redux";
import { updatePlayerMoney, updatePlayerPosition } from "@/redux/features/playerSlice";
import { setLandOwner, addHouseToLand } from "@/redux/features/landSlice";
import { Player } from "@/types/player";
import { setDoubleDice } from "@/redux/features/gameSlice";

export const handleTax = (dispatch: Dispatch, currentPlayer: any, onQuestion: any, handleNextTurn: any) => {
  console.log(`👣 Player ${currentPlayer.id} đi qua ô thuế. Trừ $200.`);
  dispatch(updatePlayerMoney({ playerId: currentPlayer.id, amount: -200 }));
  onQuestion(
    `👣 Player ${currentPlayer.id} đã đi vào ô thuế và bị trừ $200.`,
    () => {handleNextTurn();},
    () => {handleNextTurn();},
    true
  );

  // setTimeout(() => {
  //   onQuestion("", () => {}, () => {});
  //   handleNextTurn();
  // }, 1500);
};

export const handleChance = (dispatch: Dispatch, currentPlayer: any, onQuestion: any, handleNextTurn: any) => {
  console.log(`👣 Player ${currentPlayer.id} đi qua ô cơ hội. Cộng $30.`);
  dispatch(updatePlayerMoney({ playerId: currentPlayer.id, amount: 30 }));
  onQuestion(
    `👣 Player ${currentPlayer.id} đã đi vào ô cơ hội và được cộng $30.`,
    () => {handleNextTurn();},
    () => {handleNextTurn();},
    true
  );

  // setTimeout(() => {
  //   onQuestion("", () => {}, () => {});
  //   handleNextTurn();
  // }, 1500);
};

export const handleGoToJail = (dispatch: Dispatch, currentPlayer: any, onQuestion: any, handleNextTurn: any) => {
  console.log(
    `👣 Player ${currentPlayer.id} đi vào ô "Vào Tù". Chuyển đến ô "Nhà Tù" và mất 1 lượt.`
  );
  dispatch(updatePlayerPosition({ playerId: currentPlayer.id, position: 12 }));
  onQuestion(
    `👮 Player ${currentPlayer.id} đã vào ô "Nhà Tù".`,
    () => {handleNextTurn();},
    () => {handleNextTurn();},
    true
  );

  // setTimeout(() => {
  //   onQuestion("", () => {}, () => {});
  //   handleNextTurn();
  // }, 1500);
};

export const handleVisitJail = (
  dispatch: Dispatch,
  currentPlayer: Player,
  players: Player[],
  onQuestion: any,
  handleNextTurn: any
) => {
  // Lọc danh sách người chơi đang ở tù (ngoại trừ người chơi hiện tại)
  const playersInJail = players.filter(
    (player) => player.turnInJail && player.id !== currentPlayer.id
  );

  if (playersInJail.length > 0) {
    playersInJail.forEach((playerInJail) => {
      // Người chơi trong tù nhận $50
      dispatch(updatePlayerMoney({ playerId: playerInJail.id, amount: 50 }));
      // Người chơi hiện tại mất $50
      dispatch(updatePlayerMoney({ playerId: currentPlayer.id, amount: -50 }));
      console.log(
        `👮 Player ${currentPlayer.id} thăm tù và đưa $50 cho Player ${playerInJail.id}.`
      );
    });

    // Hiển thị thông báo
    onQuestion(
      `👮 Bạn đã thăm tù và đưa $50 cho mỗi người chơi trong tù.`,
      () => {handleNextTurn();},
      () => {handleNextTurn();},
      true
    );
  } else {
    console.log(
      `👣 Player ${currentPlayer.id} chỉ đi qua ô "Nhà Tù". Không có ai trong tù.`
    );
    onQuestion(
      `👣 Player ${currentPlayer.id} chỉ đi qua ô "Nhà Tù". Không có ai trong tù.`,
      () => {handleNextTurn();},
      () => {handleNextTurn();},
      true
    );
  }

  // Chuyển lượt sau khi xử lý xong
  // setTimeout(() => {
  //   onQuestion("", () => {}, () => {});
  //   handleNextTurn();
  // }, 1500);
};