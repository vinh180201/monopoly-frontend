// import { selectGameState, resetTurn, setDoubleDice, rollDice } from "@/redux/features/gameSlice";
// import { selectLandByIndex } from "@/redux/features/landSlice";
// import { selectCurrentPlayer, nextPlayer, skipPlayerTurn } from "@/redux/features/playerSlice";
// import { RootState } from "@/redux/store";
// import { handleTax, handleChance, handleGoToJail, handleVisitJail } from "@/utils/landActions";
// import { handleBuyLand, handleBuyHouse, handlePayRent } from "@/utils/propertyActions";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const PlayerWatcher = ({
//   onQuestion,
// }: {
//   onQuestion: (
//     question: string,
//     confirmAction: () => void,
//     cancelAction: () => void,
//     autoDismiss?: boolean
//   ) => void;
// }) => {
//   const dispatch = useDispatch();
//   const currentPlayer = useSelector(selectCurrentPlayer);
//   const players = useSelector((state: RootState) => state.players.players);
//   const land = useSelector((state: RootState) =>
//     selectLandByIndex(state, currentPlayer.position)
//   );
//   const gameState = useSelector(selectGameState);

//   useEffect(() => {
//     if (gameState.isMoving || !gameState.hasRolledDice) return;

//     const logPlayerMove = async () => {
//       if (!land) return;

//       console.log(
//         `Player ${currentPlayer.id} hiện tại ở ô đất: ${land.name} (index: ${land.index})`
//       );

//       switch (land.type) {
//         case "tax":
//           handleTax(dispatch, currentPlayer, onQuestion, handleNextTurn);
//           break;
//         case "chance":
//           handleChance(dispatch, currentPlayer, onQuestion, handleNextTurn);
//           break;
//         case "goToJail":
//           handleGoToJail(dispatch, currentPlayer, onQuestion, handleNextTurn);
//           break;
//         case "jail":
//           handleVisitJail(dispatch, currentPlayer, players, onQuestion, handleNextTurn);
//           break;
//         default:
//           if (["normal", "station", "utility"].includes(land.type)) {
//             if (land.owner !== undefined && land.owner !== currentPlayer.id) {
//               // Gọi hàm xử lý trả tiền thuê
//               handlePayRent(dispatch, currentPlayer, land, onQuestion, handleNextTurn);
//             } else if (land.owner === undefined) {
//               handleBuyLand(dispatch, currentPlayer, land, gameState, onQuestion, handleNextTurn);
//             } else if (land.owner === currentPlayer.id) {
//               handleBuyHouse(dispatch, currentPlayer, land, onQuestion, handleNextTurn);
//             }
//           }
//           break;
//       }
//     };

//     logPlayerMove();
//   }, [currentPlayer.id, gameState, land, dispatch, onQuestion]);

//   const handleNextTurn = () => {
//     if (gameState.rollDouble) {
//       // Nếu rollDouble là true, cộng thêm 1 lượt cho người chơi hiện tại
//       console.log(`🎉 Player ${currentPlayer.id} được thêm 1 lượt vì xúc xắc giống nhau!`);
  
//       // Đặt lại trạng thái hasRolledDice để cho phép roll lại
//       dispatch(rollDice({ hasRolledDice: false }));
  
//       // Hiển thị thông báo "được thêm lượt"
//       onQuestion(
//         `🎉 Bạn đã tung xúc xắc giống nhau và được thêm 1 lượt!`,
//         () => {},
//         () => {},
//         true
//       );
  
//       // Đặt lại trạng thái rollDouble về false
//       dispatch(setDoubleDice({ rollDouble: false }));
//     } else {
//       // Nếu không phải rollDouble, chuyển lượt
//       dispatch(nextPlayer());
//       dispatch(resetTurn());
//     }
//   };

//   return null;
// };

// export default PlayerWatcher;

import { selectGameState, resetTurn, setDoubleDice, rollDice } from "@/redux/features/gameSlice";
import { selectLandByIndex } from "@/redux/features/landSlice";
import { selectCurrentPlayer, nextPlayer } from "@/redux/features/playerSlice";
import { RootState } from "@/redux/store";
import {
  handleTax,
  handleChance,
  handleGoToJail,
  handleVisitJail,
} from "@/utils/landActions";
import {
  handleBuyLand,
  handleBuyHouse,
  handlePayRent,
} from "@/utils/propertyActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuestionQueue } from "@/hooks/useQuestionQueue"; // 👈 Import hook mới
import { useDependencyDebugger } from "@/hooks/useDependencyDebugger";
import { useGlobalQuestion } from "@/provider/QuestionContext";

const PlayerWatcher = () => {
  const dispatch = useDispatch();
  const currentPlayer = useSelector(selectCurrentPlayer);
  const players = useSelector((state: RootState) => state.players.players);
  const land = useSelector((state: RootState) =>
    selectLandByIndex(state, currentPlayer.position)
  );
  const gameState = useSelector(selectGameState);

  const { showQuestion } = useGlobalQuestion();

  useDependencyDebugger({
    'currentPlayer.id': currentPlayer.id,
    'gameState': gameState,
    'land': land,
    'dispatch': dispatch,
    'showQuestion': showQuestion,
  });

  useEffect(() => {
    if (gameState.isMoving || !gameState.hasRolledDice) return;

    const logPlayerMove = async () => {
      if (!land) return;

      console.log(
        `Player ${currentPlayer.id} hiện tại ở ô đất: ${land.name} (index: ${land.index})`
      );

      switch (land.type) {
        case "tax":
          handleTax(dispatch, currentPlayer, showQuestion, handleNextTurn);
          break;
        case "chance":
          handleChance(dispatch, currentPlayer, showQuestion, handleNextTurn);
          break;
        case "goToJail":
          handleGoToJail(dispatch, currentPlayer, showQuestion, handleNextTurn);
          break;
        case "jail":
          handleVisitJail(dispatch, currentPlayer, players, showQuestion, handleNextTurn);
          break;
        default:
          if (["normal", "station", "utility"].includes(land.type)) {
            if (land.owner !== undefined && land.owner !== currentPlayer.id) {
              handlePayRent(dispatch, currentPlayer, land, showQuestion, handleNextTurn);
            } else if (land.owner === undefined) {
              handleBuyLand(dispatch, currentPlayer, land, gameState, showQuestion, handleNextTurn);
            } else if (land.owner === currentPlayer.id) {
              handleBuyHouse(dispatch, currentPlayer, land, showQuestion, handleNextTurn);
            }
          }
          break;
      }
    };

    logPlayerMove();
  }, [currentPlayer.id, gameState, land, dispatch, showQuestion]);

  const handleNextTurn = () => {
    if (gameState.rollDouble) {
      console.log(`🎉 Player ${currentPlayer.id} được thêm 1 lượt vì xúc xắc giống nhau!`);

      dispatch(rollDice({ hasRolledDice: false }));

      showQuestion(
        `🎉 Bạn đã tung xúc xắc giống nhau và được thêm 1 lượt!`,
        () => {},
        () => {},
        true // autoDismiss
      );

      dispatch(setDoubleDice({ rollDouble: false }));
    } else {
      console.log("➡️ Đang chuyển sang người chơi kế tiếp!");
      dispatch(nextPlayer());
      dispatch(resetTurn());
    }
  };

  return null;
};

export default PlayerWatcher;
