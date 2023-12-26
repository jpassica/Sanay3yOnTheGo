// ProfilePage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import AdminApp from '../src/AdminView/components/AdminApp';
import CustApp from '../src/CustView/components/CustApp';
import TechApp from '../src/TechView/components/TechApp';
function ProfilePage({type, id}) {
  type='a';
  const renderProfileComponent = () => {
    switch (type) {
      case 'a':
        return <AdminApp id={id} />;
      case 'c':
        return <CustApp />;
      case 't':
        return <TechApp />;
      default:
        return <div>Invalid user type</div>;
    }
  };

  return (
    <div>
      {renderProfileComponent()}
    </div>
  );
}

export default ProfilePage;
