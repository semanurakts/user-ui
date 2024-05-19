import React, { useState } from 'react';
import UserList from '../components/UserLists';
import UserForm from '../components/UserForm';

const HomePage = () => {
  const [showUserForm, setShowUserForm] = useState(false);

  const handleAddUserClick = () => {
    setShowUserForm(true);
  };

  const handleFormClose = () => {
    setShowUserForm(false);
  };

  return (
    <div className="home-page">
      {showUserForm ? (
        <UserForm onClose={handleFormClose} />
      ) : (
        <>
          <UserList />
        </>
      )}
    </div>
  );
};

export default HomePage;