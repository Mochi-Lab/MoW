import { useEffect, useState } from 'react';
import DarkModeToggle from 'react-dark-mode-toggle';
export default function ToggleDarkMode() {
  const [isDark, setIsDark] = useState(localStorage.getItem('theme') === 'dark');
  useEffect(() => {
    document
      .getElementsByTagName('HTML')[0]
      .setAttribute('data-theme', localStorage.getItem('theme'));
  }, []);

  const toggleThemeChange = () => {
    if (isDark) {
      localStorage.setItem('theme', 'light');
      document.getElementsByTagName('HTML')[0].setAttribute('data-theme', 'light');
      setIsDark(false);
    } else {
      localStorage.setItem('theme', 'dark');
      document.getElementsByTagName('HTML')[0].setAttribute('data-theme', 'dark');
      setIsDark(true);
    }
  };
  return <DarkModeToggle checked={!isDark} onChange={() => toggleThemeChange()} size={80} />;
}
