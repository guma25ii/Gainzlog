import React, { type ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
}


const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className='pageLayout'>
      {children}
    </div>
  )
}

export default PageLayout;