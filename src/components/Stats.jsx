import { useEffect, useRef, useState } from "react";
import { useTasks } from "../hooks/useTasks";
import "../styles/components/Stats.css";

const statItems = [
  { key: "total", label: "Total tasks", tone: "blue" },
  { key: "completed", label: "Completed", tone: "green" },
  { key: "pending", label: "Pending", tone: "amber" },
  { key: "percentage", label: "Completion", tone: "cyan", suffix: "%" },
];

function AnimatedNumber({ value, suffix = "" }) {
  const [displayValue, setDisplayValue] = useState(value);
  const previousValue = useRef(value);

  useEffect(() => {
    let frameId;
    const startValue = previousValue.current;
    const diff = value - startValue;
    const startedAt = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startedAt) / 520, 1);
      setDisplayValue(Math.round(startValue + diff * progress));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    previousValue.current = value;
    return () => cancelAnimationFrame(frameId);
  }, [value]);

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
}

function Stats() {
  const { stats } = useTasks();

  return (
    <div className="stats-grid">
      {statItems.map((item) => {
        return (
          <article className={`stat-card stat-${item.tone}`} key={item.key}>
            <div>
              <p>{item.label}</p>
              <strong>
                <AnimatedNumber value={stats[item.key]} suffix={item.suffix} />
              </strong>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default Stats;
