import { useTasks } from "../hooks/useTasks";
import "../styles/components/SearchBar.css";

const filters = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

function SearchBar() {
  const { search, setSearch, filter, setFilter, stats } = useTasks();

  return (
    <div className="filter-panel panel">
      <label className="task-search">
        <input
          type="search"
          placeholder="Instant search across tasks..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </label>

      <div className="filter-tabs" role="tablist" aria-label="Task filters">
        {filters.map((item) => {
          const isActive = filter === item.value;

          return (
            <button
              className={`filter-chip ${isActive ? "active" : ""}`}
              key={item.value}
              onClick={() => setFilter(item.value)}
              role="tab"
              aria-selected={isActive}
            >
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <span className="filter-summary">
        {stats.pending} pending / {stats.completed} done
      </span>
    </div>
  );
}

export default SearchBar;
