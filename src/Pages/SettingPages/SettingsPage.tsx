import React, { useState } from 'react';
import BackBtn from '../../Components/BackBtn';
import Theme from '../../Components/Theme';
import PageLayout from '../../Components/PageLayouts';

const SettingsPage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [toggleRequested, setToggleRequested] = useState(false);

  const handleToggleClick = () => {
    setToggleRequested(prev => !prev); // Theme reagerar på ändring
  };
  return (
    <PageLayout>
    <div >
      <h1>Settings Page</h1>
      <p>Timer</p>
      <button className='navigationBtn' onClick={handleToggleClick}>Dark/Light Mode</button>
      <Theme toggleRequested={toggleRequested} onToggle={setDarkMode}/>
      <p>Sätt alarm</p>
      <BackBtn/>
    </div>
    </PageLayout>
  );
};

export default SettingsPage;