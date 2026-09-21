export const PERIODS = [
  { t: "6:00–8:15", s: 360, e: 495 },
  { t: "8:15–9:00", s: 495, e: 540 },
  { t: "9:00–9:45", s: 540, e: 585 },
  { t: "9:45–10:30", s: 585, e: 630 },
  { t: "10:30–11:15", s: 630, e: 675 },
  { t: "11:15–12:00", s: 675, e: 720 },
  { t: "12:00–12:45", s: 720, e: 765 },
  { t: "12:45–3:00", s: 765, e: 900 },
];

export const SUBJECTS = {
  PRACT: { n: "Practical", c: "#8d99c9" },
  PHY: { n: "Physics", c: "#7c8cff" },
  MATH: { n: "Math", c: "#4dd6a4" },
  MATHAN: { n: "Math An", c: "#38b8c9" },
  CHEM: { n: "Chem", c: "#ff8fa3" },
  STAT: { n: "Stat", c: "#ffd166" },
  APPLSTAT: { n: "Appl. Stat", c: "#f4a261" },
  ZOO: { n: "Zoology", c: "#b388ff" },
  BOT: { n: "Botany", c: "#8bd450" },
  GEO: { n: "Geo", c: "#e07be0" },
  METEO: { n: "Meteo", c: "#6fb7ff" },
  ENV: { n: "Env", c: "#5fd6c0" },
};

const E = (k, sec, room, note) => ({ k, sec, room, note });

const MON = [
  [E("PRACT", "", "", "")],
  [E("PHY", "B", "Rm 1"), E("ZOO", "", "Rm 4"), E("MATH", "A", "Rm NE")],
  [E("PHY", "A", "Rm NE"), E("MATH", "B", "Rm 1"), E("BOT", "", "Rm 4")],
  [E("MATHAN", "A", "Rm 1"), E("CHEM", "A", "Rm 4"), E("CHEM", "B", "Rm 2")],
  [E("STAT", "", "Rm 27"), E("MATHAN", "", "Rm 3")],
  [E("APPLSTAT", "", "Micro Dept", "Phy Grp")],
  [E("GEO", "", "Rm 32"), E("METEO", "", "Met Dept"), E("ENV", "", "Env Dept")],
  [E("PRACT", "", "", "")],
];

const WED = MON.map((row, i) =>
  i === 4 ? [...row, E("APPLSTAT", "B", "Rm 4", "Bio Grp")] : i === 5 ? [] : row
);

const FRI = MON.map((row, i) => (i === 5 ? [] : row));

export const DAY_GRID = { 1: MON, 2: MON, 3: WED, 4: WED, 5: FRI };

export const NP_DAYS = { 0: "आइत", 1: "सोम", 2: "मंगल", 3: "बुध", 4: "बिहि", 5: "शुक्र", 6: "शनि" };
export const EN_DAYS = { 0: "Sun", 1: "Mon", 2: "Tue", 3: "Wed", 4: "Thu", 5: "Fri", 6: "Sat" };
export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const COMBOS = {
  PCM: { full: "Physics · Chemistry · Mathematics", subs: ["PRACT", "PHY", "MATH", "CHEM", "MATHAN"] },
  PSM: { full: "Physics · Statistics · Mathematics", subs: ["PRACT", "PHY", "MATH", "STAT", "APPLSTAT"] },
  MSM: { full: "Math · Statistics · Meteo (Math An)", subs: ["PRACT", "MATH", "MATHAN", "STAT", "METEO"] },
  ZBE: { full: "Zoology · Botany · Environment", subs: ["PRACT", "ZOO", "BOT", "ENV", "APPLSTAT"] },
  ALL: { full: "Full notice — every class shown", subs: null },
  CUSTOM: { full: "Your own subject pick", subs: [] },
};

export const SEC_KEYS = ["PHY", "MATH", "CHEM", "MATHAN", "APPLSTAT"];
