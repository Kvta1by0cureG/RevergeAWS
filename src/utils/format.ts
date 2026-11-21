export function formatBs(value: number): string {
  return `Bs ${value.toFixed(2)}`;
}

export function formatDate(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleDateString("es-BO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatTime(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleTimeString("es-BO", { hour: "2-digit", minute: "2-digit" });
}
