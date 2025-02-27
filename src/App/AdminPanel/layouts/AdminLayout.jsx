import React from 'react';
import Sidebar from '../Components/Sidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-main-content">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
