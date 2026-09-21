import { DAY_GRID, EN_DAYS, MONTHS, NP_DAYS, PERIODS } from "../data";
import { filterRow, fmt, label, mondayOf, nowMins, roomTxt } from "../utils";

function Wchip({ e }) {
  return (
    <span className="wchip">
      {label(e)}
      {roomTxt(e) && <span className="wchip__room">{roomTxt(e)}</span>}
    </span>
  );
}

export default function WeekCalendar({
  allow,
  secPick,
  weekOffset,
  setWeekOffset,
  now,
}) {
  const mon = mondayOf(now);
  mon.setDate(mon.getDate() + weekOffset * 7);
  const sun = new Date(mon);
  sun.setDate(sun.getDate() + 6);

  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const m = nowMins(now);
  const realToday = now.getDay();

  return (
    <section className="card">
      <div className="card__head card__head--split">
        <span className="step">03</span>
        <h2>Week calendar</h2>
        <span className="date">
          {fmt(mon)} – {fmt(sun)}
        </span>
      </div>

      <div className="weeknav">
        <button type="button" onClick={() => setWeekOffset((w) => w - 1)}>
          ‹ Prev
        </button>
        <button type="button" onClick={() => setWeekOffset(0)}>
          This week
        </button>
        <button type="button" onClick={() => setWeekOffset((w) => w + 1)}>
          Next ›
        </button>
      </div>

      <div className="gridScroll">
        <table className="week">
          <thead>
            <tr>
              <th>Time</th>
              {Array.from({ length: 7 }, (_, i) => {
                const d = new Date(mon);
                d.setDate(d.getDate() + i);
                const isT = d.getTime() === today.getTime();
                return (
                  <th key={i} className={isT ? "today" : ""}>
                    {EN_DAYS[d.getDay()]} {d.getDate()} {MONTHS[d.getMonth()]}
                    <span className="np">{NP_DAYS[d.getDay()]}बार</span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {PERIODS.map((p, pi) => (
              <tr key={p.t}>
                <td className="timecol">{p.t}</td>
                {Array.from({ length: 7 }, (_, i) => {
                  const dn = i + 1;
                  const d = new Date(mon);
                  d.setDate(d.getDate() + i);
                  if (!(dn in DAY_GRID))
                    return (
                      <td key={i} className="off">
                        off
                      </td>
                    );
                  const items = filterRow(DAY_GRID[dn][pi], allow, secPick);
                  const isT = d.getTime() === today.getTime();
                  const live = isT && realToday === dn && m >= p.s && m < p.e;
                  return (
                    <td key={i} className={isT ? "isToday" : ""}>
                      {live && <span className="badge badge--now">NOW</span>}
                      {items.map((e, idx) => (
                        <Wchip key={idx} e={e} />
                      ))}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
