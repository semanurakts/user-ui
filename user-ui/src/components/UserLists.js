import React, { useState, useEffect } from 'react';
import UserModel from '../models/UserModel'; // Kullanıcı modelini içe aktar
import Navbar from './Navbar'; // Navbar bileşenini içe aktar
import UserForm from './UserForm'; // Kullanıcı ekleme formunu içe aktar
import UserUpdateForm from './UserUpdateForm'; // Kullanıcı güncelleme formunu içe aktar
import '../styles/userList.css'; // Kullanıcı listesi için CSS dosyasını içe aktar

const UserList = () => {
  // Kullanıcılar ve filtrelenmiş kullanıcılar için state'ler
  const [users, setUsers] = useState([]); // Tüm kullanıcılar
  const [filteredUsers, setFilteredUsers] = useState([]); // Filtrelenmiş kullanıcılar
  // Seçili rol için state
  const [selectedRole, setSelectedRole] = useState('all');
  // Kullanıcı ekleme formunun açılıp kapanmasını sağlayan state
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  // Kullanıcı güncelleme formunun açılıp kapanmasını sağlayan state
  const [isUserUpdateFormOpen, setIsUserUpdateFormOpen] = useState(false);
  // Güncellenecek kullanıcı bilgileri için state
  const [userToEdit, setUserToEdit] = useState(null);

  // Component yüklendiğinde kullanıcıları getir
  useEffect(() => {
    fetchUsers();
  }, []);

  // Tüm kullanıcıları getiren fonksiyon
  const fetchUsers = async () => {
    const userModel = new UserModel();
    try {
      const userData = await userModel.getUsers();
      setUsers(userData);
      setFilteredUsers(userData);
    } catch (error) {
      console.error('Kullanıcıları alma hatası:', error);
    }
  };

  // Rol bazlı kullanıcıları filtreleyen fonksiyon
  const filterUsersByRole = async (role) => {
    setSelectedRole(role);
    if (role === 'all') {
      setFilteredUsers(users);
    } else {
      const userModel = new UserModel();
      try {
        const filteredUserData = await userModel.filterUsersByRole(role);
        setFilteredUsers(filteredUserData);
      } catch (error) {
        console.error('Kullanıcıları filtreleme hatası:', error);
      }
    }
  };

  // Kullanıcı ekleme formunu açan fonksiyon
  const handleAddUserClick = () => {
    setUserToEdit(null);
    setIsUserFormOpen(true);
  };

  // Kullanıcı ekleme formunu kapatan fonksiyon
  const handleCloseUserForm = () => {
    setIsUserFormOpen(false);
  };

  // Yeni kullanıcı ekledikten sonra kullanıcı listesini yenileyen fonksiyon
  const handleUserAdded = () => {
    fetchUsers();
    setIsUserFormOpen(false);
  };

  // Kullanıcıyı silen fonksiyon
  const handleDeleteUser = async (userId) => {
    const userModel = new UserModel();
    try {
      await userModel.deleteUser(userId);
      fetchUsers();
    } catch (error) {
      console.error('Kullanıcı silme hatası:', error);
    }
  };

  // Kullanıcı düzenleme formunu açan fonksiyon
  const handleEditUser = (user) => {
    setUserToEdit(user);
    setIsUserUpdateFormOpen(true);
  };

  // Kullanıcı güncelleme formunu kapatan fonksiyon
  const handleCloseUserUpdateForm = () => {
    setIsUserUpdateFormOpen(false);
  };

  // Kullanıcı güncellendikten sonra kullanıcı listesini yenileyen fonksiyon
  const handleUserUpdated = () => {
    fetchUsers();
    setIsUserUpdateFormOpen(false);
  };

  return (
    <div>
      {/* Kullanıcı ekleme ve güncelleme formu açık değilse */}
      {!isUserFormOpen && !isUserUpdateFormOpen && (
        <>
          {/* Navbar */}
          <Navbar handleAddUserClick={handleAddUserClick} handleRoleFilter={filterUsersByRole} />
          <div className='user-list-spacing'></div>
          {/* Kullanıcı listesi */}
          <div className="user-list-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Kullanıcı listesi varsa */}
                {filteredUsers && filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <button onClick={() => handleEditUser(user)}>Edit</button>
                        <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  // Kullanıcı listesi boşsa
                  <tr>
                    <td colSpan="5">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
      {/* Kullanıcı ekleme formu açıksa */}
      {isUserFormOpen && <UserForm onClose={handleCloseUserForm} onUserAdded={handleUserAdded} />}
      {/* Kullanıcı güncelleme formu açıksa */}
      {isUserUpdateFormOpen && (
        <UserUpdateForm
          userToEdit={userToEdit}
          onClose={handleCloseUserUpdateForm}
          onUserUpdated={handleUserUpdated}
        />
      )}
    </div>
  );
};

export default UserList;
