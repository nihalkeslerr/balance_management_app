import React from 'react';
import Header from '../header';
const Layout = ({ children }) => {
  return (
    <div>
      <Header /> 
      <div className="content mb-20">
        {children} 
      </div>
    </div>
  );
};

export default Layout;
