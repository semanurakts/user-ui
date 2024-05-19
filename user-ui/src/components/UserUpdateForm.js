/* UserUpdateForm.js */

// Bu bileşen, bir kullanıcının bilgilerini güncellemek için kullanılan bir formu temsil eder.
import React, { useState, useEffect } from 'react';
import UserModel from '../models/UserModel';
import '../styles/userForm.css';

const UserUpdateForm = ({ userToEdit, onClose, onUserUpdated }) => {
  // Kullanıcı bilgilerini tutan form verisi
  const [formData, setFormData] = useState({
    avatar: '',
    name: '',
    username: '',
    email: '',
    role: ''
  });

  // Kullanıcı düzenleme formu ilk açıldığında, form verilerini kullanıcının bilgileriyle doldur
  useEffect(() => {
    if (userToEdit) {
      setFormData(userToEdit);
    }
  }, [userToEdit]);

  // Input alanlarına girilen değerleri form verisine güncelle
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form gönderildiğinde kullanıcı bilgilerini güncelle
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userModel = new UserModel();
    try {
      await userModel.updateUser(userToEdit.id, formData);
      console.log('Kullanıcı başarıyla güncellendi');
      onUserUpdated();
      onClose();
    } catch (error) {
      console.error('Kullanıcı güncellenirken bir hata oluştu:', error);
    }
  };

  return (
    <div className="user-form-container">
      <h2>Update User</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-inputs">
          {/* Input alanları */}
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
          {/* Rol seçimi */}
          <select name="role" value={formData.role} onChange={handleInputChange}>
            <option value="">Select Role</option>
            {['administrator', 'subscriber', 'author', 'contributor'].map((role) => (
              <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>
            ))}
          </select>
        </div>
        {/* Form butonları */}
        <div className="form-buttons">
          <button className="create-button" type="submit">Update User</button>
          <button className="close-button" onClick={onClose}>Close</button>
        </div>
      </form>
    </div>
  );
};

export default UserUpdateForm;

