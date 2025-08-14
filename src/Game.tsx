import { useEffect, useState } from "react";
import { DEFAULT_CONFIG, DEFAULT_STATE } from "./types/constants";
import { HotDog } from "./types/interfaces";
import Scoreboard from "./components/Scoreboard/Scoreboard";
import { loadGameScore, saveGameScore } from "./utils/localStorage";
import { drinkWater, eatHotdog, purchaseUpgrade } from "./utils/scoreHelper";
import HotdogShop from "./components/HotdogShop/HotdogShop";

export default function Game() {
  const config = DEFAULT_CONFIG;
  const [gameState, setGameState] = useState<HotDog.State>(DEFAULT_STATE);
  const [waterTimeout, setWaterTimeout] = useState<number | null>(null);
  const [shopItems, setShopItems] = useState<HotDog.Game.UpgradeDefinition[]>([]);
  const [cartItems, setCartItems] = useState<HotDog.Game.UpgradeId[]>([]);

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
    checkForUnlocks();
  }, [gameState.stats]);

  useEffect(() => {
    const initialState = loadGameScore();
    setGameState(initialState);

    const interval = setInterval(() => {
      setGameState((prevState) => {
        if (
          prevState.current.stomachLevel >= prevState.capabilities[HotDog.Game.CapabilityId.DIGESTIVE_SPEED] &&
          prevState.current.waterLevel >= prevState.capabilities[HotDog.Game.CapabilityId.WATER_DRAIN]
        ) {
          return {
            ...prevState,
            current: {
              ...prevState.current,
              waterLevel: Math.max(
                0,
                prevState.current.waterLevel - prevState.capabilities[HotDog.Game.CapabilityId.WATER_DRAIN]
              ),
              stomachLevel: Math.max(
                0,
                prevState.current.stomachLevel - prevState.capabilities[HotDog.Game.CapabilityId.DIGESTIVE_SPEED]
              ),
            },
          };
        }
        return prevState;
      });
    }, initialState.capabilities[HotDog.Game.CapabilityId.WATER_INTERVAL]);

    setWaterTimeout(interval as any);

    return () => clearInterval(interval);
  }, []);

  const checkForUnlocks = () => {
    const newItems = [...shopItems];
    for (const item of config.upgrades) {
      if (!newItems.find((x) => x.id == item.id)) {
        //determine which items are unlockable
        if (item.requirement) {
          if (item.requirement && gameState.stats[item.requirement.stat] >= item.requirement.amount) {
            newItems.push(item);
          }
        } else {
          newItems.push(item);
        }
      }
      if (newItems.length > 0) {
        //if we have an item, unlock the shop
        const newState = { ...gameState };
        newState.current.shopUnlocked = true;
        setGameState(newState);
      }
      setShopItems([...newItems]);
    }
  };

  const onEatHotdog = () => {
    setGameState(eatHotdog(gameState));
  };

  const onDrinkWater = () => {
    setGameState(drinkWater(gameState));
  };

  const onAddToShoppingCart = (itemId: HotDog.Game.UpgradeId) => {
    setCartItems([...cartItems, itemId]);
  };

  const onRemoveFromCart = (itemId: HotDog.Game.UpgradeId) => {
    const items = [...cartItems];
    const index = items.findIndex((x) => x == itemId);
    if (index > -1) {
      setCartItems([...items.slice(0, index), ...items.slice(index + 1)]);
    }
  };

  const onClearCart = () => {
    setCartItems([]);
  };

  const onPurchaseShopItems = () => {
    for (let i = 0; i < cartItems.length; i++) {
      const newState = purchaseUpgrade(cartItems[i], gameState, config);
      if (newState) {
        onRemoveFromCart(cartItems[i]);
        setGameState(newState);
      } else {
        //todo: add a toast or user indication of fail
        console.log("Purchase failed");
      }
    }
  };

  return (
    <div className="px-4 py-4 md:py-4 flex flex-col md:flex-row gap-4 md:gap-0 md:justify-between w-full">
      <Scoreboard state={gameState} onDrinkWater={onDrinkWater} onEatHotdog={onEatHotdog} />
      <HotdogShop
        state={gameState}
        cartItems={cartItems}
        shopItems={shopItems}
        onPurchaseItems={onPurchaseShopItems}
        onClearShoppingCart={onClearCart}
        onRemoveFromShoppingCart={onRemoveFromCart}
        onAddToShoppingCart={onAddToShoppingCart}
      />
    </div>
  );
}
