import { selectGameState, resetTurn } from "@/redux/features/gameSlice";
import { selectLandByIndex } from "@/redux/features/landSlice";
import { selectCurrentPlayer, nextPlayer } from "@/redux/features/playerSlice";
import { RootState } from "@/redux/store";
import { handleTax, handleChance, handleGoToJail } from "@/utils/landActions";
import { handleBuyLand, handleBuyHouse, handlePayRent } from "@/utils/propertyActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const PlayerWatcher = ({
  onQuestion,
}: {
  onQuestion: (
    question: string,
    confirmAction: () => void,
    cancelAction: () => void,
    autoDismiss?: boolean
  ) => void;
}) => {
  const dispatch = useDispatch();
  const currentPlayer = useSelector(selectCurrentPlayer);
  const land = useSelector((state: RootState) =>
    selectLandByIndex(state, currentPlayer.position)
  );
  const gameState = useSelector(selectGameState);

  useEffect(() => {
    if (gameState.isMoving || !gameState.hasRolledDice) return;
    
    const logPlayerMove = async () => {
      if (!land) return;

      console.log(
        `Player ${currentPlayer.id} hiện tại ở ô đất: ${land.name} (index: ${land.index})`
      );

      switch (land.type) {
        case "tax":
          handleTax(dispatch, currentPlayer, onQuestion, handleNextTurn);
          break;
        case "chance":
          handleChance(dispatch, currentPlayer, onQuestion, handleNextTurn);
          break;
        case "goToJail":
          handleGoToJail(dispatch, currentPlayer, onQuestion, handleNextTurn);
          break;
        default:
          if (["normal", "station", "utility"].includes(land.type)) {
            if (land.owner !== undefined && land.owner !== currentPlayer.id) {
              // Gọi hàm xử lý trả tiền thuê
              handlePayRent(dispatch, currentPlayer, land, onQuestion, handleNextTurn);
            } else if (land.owner === undefined) {
              handleBuyLand(dispatch, currentPlayer, land, gameState, onQuestion, handleNextTurn);
            } else if (land.owner === currentPlayer.id) {
              handleBuyHouse(dispatch, currentPlayer, land, onQuestion, handleNextTurn);
            }
          }
          break;
      }
    };

    logPlayerMove();
  }, [currentPlayer.id, gameState, land, dispatch, onQuestion]);

  const handleNextTurn = () => {
    dispatch(nextPlayer());
    dispatch(resetTurn());
  };

  return null;
};

export default PlayerWatcher;