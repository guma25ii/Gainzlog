import React, { useEffect, useState } from "react";

type ThemeProps = {
  storageKey?: string;
  defaultMode?: "light" | "dark";
};

const Theme: React.FC<ThemeProps> = ({storageKey = "darkMode", defaultMode = "light",}) => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(storageKey);

    return saved ? JSON.parse(saved) : defaultMode === "dark";
  });


  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(darkMode));

    document.body.classList.remove("light", "dark");
    document.body.classList.add(darkMode ? "dark" : "light");
  }, [darkMode, storageKey]);

  return (
    <button
      className="navigationBtn"
      onClick={() => setDarkMode(prev => !prev)}
    >
      Toggle theme
    </button>
  );
};

export default Theme;