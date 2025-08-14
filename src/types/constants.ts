import { HotDog } from "./interfaces";

export enum HOTDOG {
  STATE = "GAME_STATE",
}

export const DEFAULT_CONFIG: HotDog.Game.Config = {
  upgrades: [
    {
      id: HotDog.Game.UpgradeId.BIGGER_BITE,
      name: "Bigger Bite",
      cost: 25,
      effect: { capability: HotDog.Game.CapabilityId.HOTDOG_POWER, increase: 1 },
    },
    {
      id: HotDog.Game.UpgradeId.IRON_STOMACH,
      name: "Iron Stomach",
      cost: 100,
      effect: { capability: HotDog.Game.CapabilityId.STOMACH_CAPACITY, increase: 5 },
      requirement: { stat: HotDog.Game.StatId.HOTDOGS_EATEN, amount: 25 },
    },
    {
      id: HotDog.Game.UpgradeId.BIGGER_GULP,
      name: "Bigger Gulp",
      cost: 50,
      effect: { capability: HotDog.Game.CapabilityId.WATER_POWER, increase: 5 },
    },
    {
      id: HotDog.Game.UpgradeId.WATER_TANK,
      name: "Water Tank",
      cost: 150,
      effect: { capability: HotDog.Game.CapabilityId.WATER_CAPACITY, increase: 50 },
      requirement: { stat: HotDog.Game.StatId.WATER_DRUNK, amount: 200 },
    },
    {
      id: HotDog.Game.UpgradeId.SPEED_DIGEST,
      name: "Speed Digest",
      cost: 200,
      effect: { capability: HotDog.Game.CapabilityId.DIGESTIVE_SPEED, increase: 0.5 },
      requirement: { stat: HotDog.Game.StatId.HOTDOGS_EATEN, amount: 50 },
    },
  ],
};

export const BASE_CAPABILITIES: Record<HotDog.Game.CapabilityId, number> = {
  [HotDog.Game.CapabilityId.HOTDOG_POWER]: 1,
  [HotDog.Game.CapabilityId.STOMACH_CAPACITY]: 10,
  [HotDog.Game.CapabilityId.WATER_POWER]: 10,
  [HotDog.Game.CapabilityId.WATER_CAPACITY]: 100,
  [HotDog.Game.CapabilityId.DIGESTIVE_SPEED]: 1,
  [HotDog.Game.CapabilityId.WATER_DRAIN]: 10,
  [HotDog.Game.CapabilityId.WATER_INTERVAL]: 1000,
};

export const DEFAULT_STATE: HotDog.State = {
  stats: {
    [HotDog.Game.StatId.HOTDOGS_EATEN]: 0,
    [HotDog.Game.StatId.WATER_DRUNK]: 0,
  },
  current: {
    waterLevel: 0,
    stomachLevel: 0,
    money: 50,
    hotdogStash: 0,
    shopUnlocked: false,
  },
  upgrades: {
    [HotDog.Game.UpgradeId.BIGGER_BITE]: 0,
    [HotDog.Game.UpgradeId.IRON_STOMACH]: 0,
    [HotDog.Game.UpgradeId.BIGGER_GULP]: 0,
    [HotDog.Game.UpgradeId.WATER_TANK]: 0,
    [HotDog.Game.UpgradeId.SPEED_DIGEST]: 0,
  },
  capabilities: { ...BASE_CAPABILITIES },
};
