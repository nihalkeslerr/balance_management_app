import React from 'react';
import Header from '../header';
import Footer from '../footer';
const Layout = ({ children }) => {
  return (
    <div>
      <Header /> 
      <div className="content mb-20">
        {children} 
      </div>
  {/*     <Footer />  */}
    </div>
  );
};

export default Layout;
