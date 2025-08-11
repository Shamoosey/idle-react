import { HotDog } from "../../types/interfaces";
import { Button } from "../UI/Button";
import HotdogShopDisplay from "./ShopDisplay";

export interface HotdogShopProps {
  state: HotDog.State;
}

function HotdogShop({ state }: HotdogShopProps) {
  return (
    <div className="min-w-[300px]">
      <div className="flex mb-4 justify-between">
        <h1 className="text-4xl">Shop</h1>
      </div>
      <HotdogShopDisplay />
      <Button variant="green">Purchase Items</Button>
      <div className="flex space-around"></div>
    </div>
  );
}

export default HotdogShop;
