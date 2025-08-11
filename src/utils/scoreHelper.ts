import { BASE_CAPABILITIES, DEFAULT_CONFIG } from "../types/constants";
import { HotDog } from "../types/interfaces";

export function eatHotdog(oldState: HotDog.State): HotDog.State {
  const state = { ...oldState };
  if (state.current.stomachLevel < state.capabilities.stomachCapacity) {
    state.stats[HotDog.Game.StatId.HOTDOGS_EATEN] += state.capabilities.hotdogPower;
    state.current.stomachLevel += state.capabilities.hotdogPower;
  }
  return state;
}
export function drinkWater(oldState: HotDog.State): HotDog.State {
  const state = { ...oldState };

  if (state.current.waterLevel < state.capabilities.waterCapacity) {
    state.current.waterLevel += state.capabilities.waterPower;
  }

  return state;
}

export function calculateCapabilities(upgrades: HotDog.State["upgrades"], config: HotDog.Game.Config = DEFAULT_CONFIG): HotDog.State["capabilities"] {
  const capabilities = { ...BASE_CAPABILITIES };

  config.upgrades.forEach((upgradeDef) => {
    const purchaseCount = upgrades[upgradeDef.id];
    if (purchaseCount > 0) {
      capabilities[upgradeDef.effect.capability] += upgradeDef.effect.increase * purchaseCount;
    }
  });

  return capabilities;
}

export function canPurchaseUpgrade(upgradeId: HotDog.Game.UpgradeId, state: HotDog.State, config: HotDog.Game.Config = DEFAULT_CONFIG): boolean {
  const upgrade = config.upgrades.find((u) => u.id === upgradeId);
  if (!upgrade) return false;

  if (state.current.money < upgrade.cost) return false;

  if (upgrade.requirement) {
    if (state.stats[upgrade.requirement.stat] < upgrade.requirement.amount) {
      return false;
    }
  }

  return true;
}
