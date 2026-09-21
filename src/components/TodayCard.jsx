import { DAY_GRID, NP_DAYS, PERIODS } from "../data";
import { filterRow, fmt, label, periodState, roomTxt } from "../utils";

function Pill({ e }) {
  return (
    <span className="pill">
      {label(e)}
      {roomTxt(e) && <span className="pill__room">{roomTxt(e)}</span>}
    </span>
  );
}

export default function TodayCard({ allow, secPick, now }) {
  const d = now.getDay();
  const { curIdx, nextIdx } = periodState(PERIODS, now);
  const isWeekend = !(d in DAY_GRID);

  return (
    <section className="card">
      <div className="card__head card__head--split">
        <span className="step">02</span>
        <h2>
          Today <span className="np">{NP_DAYS[d]}बार</span>
        </h2>
        <span className="date">
          {fmt(now)}, {now.getFullYear()}
        </span>
      </div>

      {isWeekend ? (
        <div className="empty empty--big">
          Weekend — no classes on Saturday or Sunday. The week calendar below covers
          Monday to Friday.
        </div>
      ) : (
        <div className="slots">
          {PERIODS.map((p, i) => {
            const items = filterRow(DAY_GRID[d][i], allow, secPick);
            const isNow = i === curIdx;
            const isNext = i === nextIdx;
            return (
              <div
                key={p.t}
                className={`slot${isNow ? " slot--now" : ""}${
                  isNext ? " slot--next" : ""
                }`}
              >
                <div className="slot__time">
                  {p.t}
                  {isNow && <span className="badge badge--now">NOW</span>}
                  {isNext && <span className="badge badge--next">NEXT</span>}
                </div>
                <div className="slot__body">
                  {items.length ? (
                    items.map((e, idx) => <Pill key={idx} e={e} />)
                  ) : (
                    <span className="empty">free period</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
