import { DEFAULT_CONFIG } from "../types/constants";
import { HotDog } from "../types/interfaces";

export function eatHotdog(oldState: HotDog.State): HotDog.State {
  if (oldState.current.stomachLevel >= oldState.capabilities.stomachCapacity) {
    return oldState;
  }

  return {
    ...oldState,
    stats: {
      ...oldState.stats,
      [HotDog.Game.StatId.HOTDOGS_EATEN]: oldState.stats[HotDog.Game.StatId.HOTDOGS_EATEN] + oldState.capabilities.hotdogPower,
    },
    current: {
      ...oldState.current,
      stomachLevel: oldState.current.stomachLevel + oldState.capabilities.hotdogPower,
    },
  };
}

export function drinkWater(oldState: HotDog.State): HotDog.State {
  if (oldState.current.waterLevel >= oldState.capabilities.waterCapacity) {
    return oldState;
  }

  return {
    ...oldState,
    stats: {
      ...oldState.stats,
      [HotDog.Game.StatId.WATER_DRUNK]: oldState.stats[HotDog.Game.StatId.WATER_DRUNK] + oldState.capabilities.waterPower,
    },
    current: {
      ...oldState.current,
      waterLevel: oldState.current.waterLevel + oldState.capabilities.waterPower,
    },
  };
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

export function purchaseUpgrade(upgradeId: HotDog.Game.UpgradeId, state: HotDog.State, config: HotDog.Game.Config = DEFAULT_CONFIG): HotDog.State | null {
  if (!canPurchaseUpgrade(upgradeId, state, config)) {
    return null;
  }

  const upgrade = config.upgrades.find((u) => u.id === upgradeId);
  if (!upgrade) return null;

  return {
    ...state,
    current: {
      ...state.current,
      money: state.current.money - upgrade.cost,
    },
    upgrades: {
      ...state.upgrades,
      [upgradeId]: state.upgrades[upgradeId] + 1,
    },
    capabilities: {
      ...state.capabilities,
      [upgrade.effect.capability]: state.capabilities[upgrade.effect.capability] + upgrade.effect.increase,
    },
  };
}
