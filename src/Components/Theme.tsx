import React, { useEffect, useState } from "react";

const Theme: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem("darkMode") || "false");
  });

  // apply theme + save
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));

    document.body.classList.remove("light", "dark");
    document.body.classList.add(darkMode ? "dark" : "light");
  }, [darkMode]);

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