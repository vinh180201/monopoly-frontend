import { selectGameState, resetTurn, setDoubleDice, rollDice } from "@/redux/features/gameSlice";
import { selectLandByIndex } from "@/redux/features/landSlice";
import { selectCurrentPlayer, nextPlayer } from "@/redux/features/playerSlice";
import { RootState } from "@/redux/store";
import {
  handleTax,
  handleChance,
  handleGoToJail,
  handleVisitJail,
  checkPassStart,
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

      // const prevPosition = currentPlayer.prevPosition; // bạn cần lưu trước đó vào redux hoặc state
      // const newPosition = currentPlayer.position;
  
      // checkPassStart(dispatch, currentPlayer, prevPosition, newPosition, showQuestion);
      
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
          } else {
            handleNextTurn();
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
