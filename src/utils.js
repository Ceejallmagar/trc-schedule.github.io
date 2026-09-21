import { EN_DAYS, MONTHS, SUBJECTS } from "./data";

export const hexA = (hex, a) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

export const label = (e) =>
  SUBJECTS[e.k].n + (e.sec ? ` (${e.sec})` : "") + (e.note ? ` (${e.note})` : "");

export const roomTxt = (e) => e.room || "";

export function mondayOf(d) {
  const x = new Date(d);
  const day = (x.getDay() + 6) % 7;
  x.setDate(x.getDate() - day);
  x.setHours(0, 0, 0, 0);
  return x;
}

export const fmt = (d) => `${EN_DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`;

export function nowMins(date = new Date()) {
  return date.getHours() * 60 + date.getMinutes();
}

export function filterRow(row, allow, secPick) {
  const r = allow ? row.filter((e) => allow.has(e.k)) : row;
  return r.filter((e) => !e.sec || !secPick[e.k] || secPick[e.k] === e.sec);
}

export function periodState(periods, date) {
  const m = nowMins(date);
  let curIdx = -1;
  let nextIdx = -1;
  periods.forEach((p, i) => {
    if (m >= p.s && m < p.e) curIdx = i;
    if (nextIdx < 0 && p.s > m) nextIdx = i;
  });
  return { m, curIdx, nextIdx };
}
