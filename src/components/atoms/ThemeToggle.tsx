import { useState } from "react";
import { Sun, Moon } from "lucide-react";

/**
 * Dark/light toggle. The initial theme is applied by an inline script in
 * index.html (before paint), so here we just read the current state (lazily,
 * from the <html> class the script set) and let the user flip it — persisting
 * the choice to localStorage.
 */
const ThemeToggle = () => {
  const [dark, setDark] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark")
  );

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* ignore storage errors (private mode, etc.) */
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 text-gray-500 hover:text-primary hover:border-primary dark:border-white/15 dark:text-gray-400 transition-colors"
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
};

export default ThemeToggle;
