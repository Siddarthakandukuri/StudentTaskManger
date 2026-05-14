export function formatDate(dateValue) {
  if (!dateValue) return "No due date";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${dateValue}T00:00:00`));
}

export function getDueState(dateValue, completed) {
  if (!dateValue || completed) return "neutral";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(`${dateValue}T00:00:00`);
  const diffDays = Math.ceil((due - today) / 86400000);

  if (diffDays < 0) return "overdue";
  if (diffDays <= 2) return "soon";
  return "upcoming";
}
