export namespace HotDog {
  export namespace Game {
    export enum UpgradeId {
      BIGGER_BITE = "biggerBite",
      IRON_STOMACH = "ironStomach",
      BIGGER_GULP = "biggerGulp",
      WATER_TANK = "waterTank",
      SPEED_DIGEST = "speedDigest",
    }

    export enum StatId {
      HOTDOGS_EATEN = "hotdogsEaten",
      WATER_DRUNK = "waterDrunk",
    }

    export enum CapabilityId {
      HOTDOG_POWER = "hotdogPower",
      STOMACH_CAPACITY = "stomachCapacity",
      WATER_POWER = "waterPower",
      WATER_CAPACITY = "waterCapacity",
      WATER_DRAIN = "waterDrain",
      WATER_INTERVAL = "waterInterval",
      DIGESTIVE_SPEED = "digestiveSpeed",
    }

    export interface UpgradeDefinition {
      id: UpgradeId;
      name: string;
      cost: number;
      effect: {
        capability: CapabilityId;
        increase: number;
      };
      requirement?: {
        stat: StatId;
        amount: number;
      };
    }

    export interface Config {
      upgrades: UpgradeDefinition[];
    }
  }

  export interface State {
    stats: {
      [Game.StatId.HOTDOGS_EATEN]: number;
      [Game.StatId.WATER_DRUNK]: number;
    };
    current: {
      waterLevel: number;
      stomachLevel: number;
      money: number;
      hotdogStash: number;
    };
    upgrades: {
      [key in Game.UpgradeId]: number;
    };
    capabilities: {
      [key in Game.CapabilityId]: number;
    };
  }
}
