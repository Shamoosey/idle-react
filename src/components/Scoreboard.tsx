import { HotDog } from "../types/interfaces";
import { ProgressBar } from "./ProgressBar";

export interface ScoreboardProps {
  state: HotDog.State;
}

function Scoreboard({ state }: ScoreboardProps) {
  return (
    <div>
      <div className="flex flex-col text-xl mb-4">
        <div className="flex justify-between">
          <div className="w-70 text-2xl">### Hotdogs Consumed</div>
          <div>{state.stats[HotDog.Game.StatId.HOTDOGS_EATEN] ?? 0}</div>
        </div>
        <div className="flex justify-between mt-2">
          <div className="w-70">### Hotdog Stash</div>
          <div>{state.current.hotdogStash}</div>
        </div>
        <div className="flex justify-between">
          <div className="w-70">### Cash</div>
          <div>$ {state.current.money}</div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="w-70">### Stomach Capacity</div>
          <div>
            {state.current.stomachLevel} / {state.capabilities.stomachCapacity}
          </div>
        </div>
        <ProgressBar color="bg-emerald-500" val={state.current.stomachLevel} max={state.capabilities.stomachCapacity} />
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="w-50">### Water Capacity</div>
          <div>
            {state.current.waterLevel} / {state.capabilities.waterCapacity}
          </div>
        </div>
        <ProgressBar color="bg-sky-500" val={state.current.waterLevel} max={state.capabilities.waterCapacity} />
      </div>
    </div>
  );
}

export default Scoreboard;
