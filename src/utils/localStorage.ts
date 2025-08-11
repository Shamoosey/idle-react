import { DEFAULT_STATE, HOTDOG } from "../types/constants";
import { HotDog } from "../types/interfaces";

export function saveGameScore(state: HotDog.State): void {
  localStorage.setItem(HOTDOG.STATE, JSON.stringify(state));
}

// TODO
// fix the saving logic so its not overriding on interface changes
export function loadGameScore(): HotDog.State {
  try {
    const save = localStorage.getItem(HOTDOG.STATE);
    if (save) {
      const parsedState = JSON.parse(save);

      if (parsedState.stats && parsedState.current && parsedState.upgrades) {
        return parsedState as HotDog.State;
      } else {
        console.log("Old save format detected, starting fresh");
        localStorage.removeItem(HOTDOG.STATE);
      }
    }
  } catch (error) {
    console.log("Error loading save data, using default state:", error);
    localStorage.removeItem(HOTDOG.STATE);
  }
  return DEFAULT_STATE;
}
