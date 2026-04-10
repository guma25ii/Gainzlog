import React, { useEffect, useState } from 'react';

interface ThemeProps {
  toggleRequested?: boolean; // signal från förälder
  onToggle?: (darkMode: boolean) => void; // notifierar förälder
}

const Theme: React.FC<ThemeProps> = ({ toggleRequested, onToggle }) => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.body.classList.remove("light", "dark");
    document.body.classList.add(darkMode ? "dark" : "light");
    onToggle?.(darkMode);
  }, [darkMode, onToggle]);

  // Toggla när föräldern vill
  useEffect(() => {
    if (toggleRequested) setDarkMode(prev => !prev);
  }, [toggleRequested]);

  return null;
};

export default Theme;