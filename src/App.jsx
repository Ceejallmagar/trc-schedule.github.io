import { useEffect, useMemo, useState } from "react";
import { COMBOS, DAY_GRID } from "./data";
import { useLocalStorage } from "./useLocalStorage";
import CombinationPicker from "./components/CombinationPicker";
import TodayCard from "./components/TodayCard";
import WeekCalendar from "./components/WeekCalendar";

export default function App() {
  const [combo, setCombo] = useLocalStorage("trc-combo", "PCM");
  const [customSubs, setCustomSubs] = useLocalStorage("trc-custom", [
    "PHY",
    "MATH",
    "STAT",
    "PRACT",
  ]);
  const [secPick, setSecPick] = useLocalStorage("trc-sec", {});
  const [weekOffset, setWeekOffset] = useState(0);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);

  const allow = useMemo(() => {
    if (combo === "ALL") return null;
    if (combo === "CUSTOM") return new Set(customSubs);
    return new Set(COMBOS[combo].subs);
  }, [combo, customSubs]);

  const hasClasses = now.getDay() in DAY_GRID;

  return (
    <div className="page">
      <div className="grain" aria-hidden="true" />
      <div className="wrap">
        <header className="masthead">
          <span className="masthead__eyebrow">
            त्रिभुवन विश्वविद्यालय · त्रि-चन्द्र बहुमुखी क्याम्पस
          </span>
          <h1 className="masthead__title">
            My <em>Routine</em>
            <span className="masthead__tag">BSc Morning Shift</span>
          </h1>
          <p className="masthead__sub">
            2nd year classes 
          </p>
        </header>

        <CombinationPicker
          combo={combo}
          setCombo={setCombo}
          customSubs={customSubs}
          setCustomSubs={setCustomSubs}
          secPick={secPick}
          setSecPick={setSecPick}
        />

        <TodayCard allow={allow} secPick={secPick} now={now} />

        <WeekCalendar
          allow={allow}
          secPick={secPick}
          weekOffset={weekOffset}
          setWeekOffset={setWeekOffset}
          now={now}
        />

        <footer className="foot">
          <span className="foot__rule" />
          <p>
            Transcribed from the campus notice (Mon–Fri, 6:00–3:00). Rooms and sections
            exactly as printed · Sat–Sun off · notice note: only enrolled students may
            enter class.
          </p>
          <p className="foot__muted">
            {hasClasses
              ? "Times shown in Nepal Standard Time."
              : "Enjoy the weekend — classes resume Monday."}
          </p>
        </footer>
      </div>
    </div>
  );
}
