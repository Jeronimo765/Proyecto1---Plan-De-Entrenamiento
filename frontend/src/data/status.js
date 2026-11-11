export const STATUSES = [
  { value: "pendiente", label: "Pendiente", color: "text-slate-500" },
  { value: "en-proceso", label: "En proceso", color: "text-amber-600" },
  { value: "terminada", label: "Terminada", color: "text-emerald-600" },
];

export const getStatus = (value) =>
  STATUSES.find((status) => status.value === value) ?? STATUSES[0];
