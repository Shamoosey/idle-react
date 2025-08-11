interface ProgressBarProps {
  color?: string;
  max: number;
  val: number;
}

export function ProgressBar({ color = "bg-blue-500", max, val }: ProgressBarProps) {
  const percentage = Math.min((val / max) * 100, 100);

  return (
    <div className="w-full bg-gray-200 rounded h-4 overflow-hidden">
      <div
        className={`h-full ${color} transition-all duration-300`}
        style={{ width: `${percentage}%` }}></div>
    </div>
  );
}
