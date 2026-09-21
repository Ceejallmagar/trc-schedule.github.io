import { useState, useCallback } from "react";

const mem = {};

function read(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    if (v !== null) return JSON.parse(v);
  } catch {
    if (key in mem) return mem[key];
  }
  return fallback;
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    mem[key] = value;
  }
}

export function useLocalStorage(key, fallback) {
  const [value, setValue] = useState(() => read(key, fallback));
  const set = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === "function" ? next(prev) : next;
        write(key, resolved);
        return resolved;
      });
    },
    [key]
  );
  return [value, set];
}
