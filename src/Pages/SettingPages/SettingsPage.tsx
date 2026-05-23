import React from 'react';
import BackBtn from '../../Components/BackBtn';
import Theme from '../../Components/Theme';
import PageLayout from '../../Components/PageLayouts';

const SettingsPage: React.FC = () => {
  return (
    <PageLayout>
      <div className='centerContent'>
        <h1>Settings Page</h1>
        <p>Timer</p>
        <Theme />
        <p>Sätt alarm</p>
        <BackBtn />
      </div>
    </PageLayout>
  );
};

export default SettingsPage;