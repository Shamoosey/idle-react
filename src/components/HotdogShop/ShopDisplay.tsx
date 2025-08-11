import { useState } from "react";
import { DEFAULT_CONFIG } from "../../types/constants";
import { HotDog } from "../../types/interfaces";
import { CircleMinus, CirclePlus, ShoppingCart } from "lucide-react";

function HotdogShopDisplay() {
  const [shopItems, setShopItems] = useState<HotDog.Game.UpgradeDefinition[]>(DEFAULT_CONFIG.upgrades);
  const [cartItems, setCartItems] = useState<HotDog.ShoppingCart[]>([]);

  const getShoppingCartCount = (itemId: HotDog.Game.UpgradeId) => {
    return cartItems.filter((x) => x.itemId == itemId).length ?? 0;
  };

  const addToShoppingCart = (itemId: HotDog.Game.UpgradeId) => {
    const item = shopItems.find((x) => x.id == itemId);
    if (item) {
      const cartItem: HotDog.ShoppingCart = {
        itemId: itemId,
        count: 1,
      };
      setCartItems([cartItem, ...cartItems]);
    }
  };

  return (
    <div className="flex flex-col">
      {shopItems.map((x) => (
        <div
          className="flex py-2"
          key={x.id}>
          <div className="flex items-center">
            <div className="min-w-30">{x.name}</div>
            <div className="min-w-25">${x.cost}</div>
          </div>
          <div className="flex min-w-10 justify-between items-center">
            <span className="min-w-5">{getShoppingCartCount(x.id)}</span>
            <div className="flex gap-1">
              <button
                className="cursor-pointer"
                onClick={() => addToShoppingCart(x.id)}>
                <CirclePlus />
              </button>
              <button className="cursor-pointer">
                <CircleMinus />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HotdogShopDisplay;
