import { useEffect, useState } from 'react';
import './index.css';

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
  return (
    <div className='darkmode-switch'>
      <div className='toggle' title='toggle dark mode'>
        <label>
          <input checked={!isDark} onChange={() => toggleThemeChange()} type='checkbox' name='' />
          <span></span>
        </label>
      </div>
    </div>
  );
}
