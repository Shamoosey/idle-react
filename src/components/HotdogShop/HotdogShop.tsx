import { useState } from "react";
import { HotDog } from "../../types/interfaces";
import { CircleMinus, CirclePlus } from "lucide-react";
import { Button } from "../UI/Button";

export interface HotdogDisplayProps {
  state: HotDog.State;
  shopItems: HotDog.Game.UpgradeDefinition[];
  cartItems: HotDog.Game.UpgradeId[];
  onPurchaseItems: () => void;
  onAddToShoppingCart: (item: HotDog.Game.UpgradeId) => void;
  onRemoveFromShoppingCart: (item: HotDog.Game.UpgradeId) => void;
  onClearShoppingCart: () => void;
}

function HotdogShopDisplay({
  state,
  shopItems,
  cartItems,
  onPurchaseItems,
  onAddToShoppingCart,
  onRemoveFromShoppingCart,
  onClearShoppingCart,
}: HotdogDisplayProps) {
  const getShoppingCartCount = (itemId: HotDog.Game.UpgradeId) => {
    return cartItems.filter((x) => x == itemId).length ?? null;
  };

  //todo: add better shop items with descriptions / tooltips for each
  return (
    <div
      className={
        (state.current.shopUnlocked ? "block" : "hidden") + " min-w-[300px] min-h[300px] border-4 p-4 rounded-lg"
      }>
      <div className="flex mb-4 justify-between">
        <h1 className="text-4xl">Shop</h1>
      </div>
      <div className="flex flex-col justify-between">
        {shopItems.map((x) => (
          <div className="flex py-2" key={x.id}>
            <div className="flex items-center">
              <div className="min-w-30">{x.name}</div>
              <div className="min-w-25">${x.cost}</div>
            </div>
            <div className="flex min-w-10 justify-between items-center">
              <span className="min-w-5">{getShoppingCartCount(x.id)}</span>
              <div className="flex gap-1">
                <Button variant="icon" className="cursor-pointer" onClick={() => onAddToShoppingCart(x.id)}>
                  <CirclePlus />
                </Button>
                <Button variant="icon" className="cursor-pointer" onClick={() => onRemoveFromShoppingCart(x.id)}>
                  <CircleMinus />
                </Button>
              </div>
            </div>
          </div>
        ))}
        <div className="mt-1 flex justify-around">
          <Button variant="green" onClick={() => onPurchaseItems()}>
            Purchase Items
          </Button>
          <Button variant="red" onClick={onClearShoppingCart}>
            Clear Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HotdogShopDisplay;
