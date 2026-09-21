import { COMBOS, SEC_KEYS, SUBJECTS } from "../data";

export default function CombinationPicker({
  combo,
  setCombo,
  customSubs,
  setCustomSubs,
  secPick,
  setSecPick,
}) {
  const toggleSubject = (k) => {
    setCustomSubs((prev) =>
      prev.includes(k) ? prev.filter((s) => s !== k) : [...prev, k]
    );
  };

  const setGroup = (val) => {
    if (!val) return setSecPick({});
    setSecPick(Object.fromEntries(SEC_KEYS.map((k) => [k, val])));
  };

  const setOne = (k, v) => {
    setSecPick((prev) => {
      const next = { ...prev };
      if (v) next[k] = v;
      else delete next[k];
      return next;
    });
  };

  const allEq = (v) => SEC_KEYS.every((k) => secPick[k] === v);
  const groupActive = (val) =>
    val === "" ? Object.keys(secPick).length === 0 : allEq(val);

  const desc =
    combo === "CUSTOM"
      ? "Custom pick — tap the subjects you actually attend."
      : "Subjects: " +
        (COMBOS[combo].subs || Object.keys(SUBJECTS))
          .map((k) => SUBJECTS[k].n)
          .join(", ");

  return (
    <section className="card card--picker">
      <div className="card__head">
        <span className="step">01</span>
        <h2>Your combination</h2>
      </div>

      <div className="chips">
        {Object.keys(COMBOS).map((key) => (
          <button
            key={key}
            type="button"
            className={`chip${key === combo ? " on" : ""}`}
            onClick={() => setCombo(key)}
          >
            <span className="chip__label">
              {key === "ALL" ? "All classes" : key === "CUSTOM" ? "Custom" : key}
            </span>
            {key !== "ALL" && key !== "CUSTOM" && (
              <span className="chip__meta">
                {COMBOS[key].full.split("·").length} subjects
              </span>
            )}
          </button>
        ))}
      </div>

      {combo === "CUSTOM" && (
        <div className="subjBox">
          {Object.keys(SUBJECTS).map((k) => {
            const on = customSubs.includes(k);
            return (
              <button
                key={k}
                type="button"
                className={`subj${on ? " on" : ""}`}
                onClick={() => toggleSubject(k)}
              >
                {SUBJECTS[k].n}
              </button>
            );
          })}
        </div>
      )}

      <div className="setAll">
        <span className="setAll__label">Set all sections</span>
        <div className="chips">
          {[
            ["A", "All → A"],
            ["B", "All → B"],
            ["", "Show both"],
          ].map(([val, name]) => (
            <button
              key={name}
              type="button"
              className={`chip chip--mini${groupActive(val) ? " on" : ""}`}
              onClick={() => setGroup(val)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className="secRows">
        {SEC_KEYS.map((k) => {
          const cur = secPick[k] || "both";
          return (
            <div className="secRow" key={k}>
              <span className="secRow__name">
                {SUBJECTS[k].n} — my class
              </span>
              <div className="segmented">
                {[
                  ["A", "A"],
                  ["B", "B"],
                  ["", "both"],
                ].map(([v, nm]) => (
                  <button
                    key={nm}
                    type="button"
                    className={`seg${(v || "both") === cur ? " on" : ""}`}
                    onClick={() => setOne(k, v)}
                  >
                    {nm}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <p className="note">
        Physics, Math, Chem… each run as two parallel classes — <b>A</b> and <b>B</b> — by
        two different teachers in different rooms. You attend only one per subject, and it
        can differ per subject, so pick yours subject by subject. “Set all” is just a
        shortcut.
      </p>
      <p className="note note--strong">{desc}</p>
    </section>
  );
}
