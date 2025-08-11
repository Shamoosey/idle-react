import { HotDog } from "../../types/interfaces";
import { Button } from "../Button";
import HotdogShopDisplay from "./ShopDisplay";

export interface HotdogShopProps {
  state: HotDog.State;
}

function HotdogShop({ state }: HotdogShopProps) {
  return (
    <div className="w-[400px]">
      <div className="flex mb-4">
        <h1 className="text-4xl">Shop</h1>
      </div>
      <HotdogShopDisplay />
      <div className="flex space-around">
        <Button variant="yellow" className="mr-2">
          Add to Cart
        </Button>
        <Button variant="green">Check Out</Button>
      </div>
    </div>
  );
}

export default HotdogShop;
