import { useEffect, useState } from "react";
import { DEFAULT_STATE } from "./types/constants";
import { HotDog } from "./types/interfaces";
import Scoreboard from "./components/Scoreboard";
import { Button } from "./components/UI/Button";
import { loadGameScore, saveGameScore } from "./utils/localStorage";
import { drinkWater, eatHotdog } from "./utils/scoreHelper";
import HotdogShop from "./components/HotdogShop/Shop";

export default function Game() {
  const [gameState, setGameState] = useState<HotDog.State>(DEFAULT_STATE);
  const [waterTimeout, setWaterTimeout] = useState<number | null>(null);

  useEffect(() => {
    const handleBeforeUnload = () => {
      saveGameScore(gameState);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [gameState]);

  useEffect(() => {
    const initialState = loadGameScore();
    setGameState(initialState);

    const interval = setInterval(() => {
      setGameState((prevState) => {
        if (prevState.current.stomachLevel > 0 && prevState.current.waterLevel >= prevState.capabilities[HotDog.Game.CapabilityId.DIGESTIVE_SPEED]) {
          return {
            ...prevState,
            current: {
              ...prevState.current,
              waterLevel: Math.max(0, prevState.current.waterLevel - prevState.capabilities[HotDog.Game.CapabilityId.WATER_DRAIN]),
              stomachLevel: Math.max(0, prevState.current.stomachLevel - prevState.capabilities[HotDog.Game.CapabilityId.DIGESTIVE_SPEED]),
            },
          };
        }
        return prevState;
      });
    }, initialState.capabilities[HotDog.Game.CapabilityId.WATER_INTERVAL]);

    setWaterTimeout(interval as any);

    return () => clearInterval(interval);
  }, []);

  const onEatHotdog = () => {
    setGameState(eatHotdog(gameState));
  };

  const onDrinkWater = () => {
    setGameState(drinkWater(gameState));
  };

  const isEatHotdogButtonEnabled = () => {
    return gameState.current.hotdogStash > 0;
  };

  return (
    <div className="p-2 flex">
      <div className="mx-4">
        <Scoreboard state={gameState} />
        <div className="my-4 flex gap-2">
          <Button
            onClick={onEatHotdog}
            disabled={!isEatHotdogButtonEnabled()}>
            Eat Hotdog
          </Button>
          <Button onClick={onDrinkWater}>Drink Water</Button>
        </div>
      </div>
      <HotdogShop state={gameState} />
    </div>
  );
}
