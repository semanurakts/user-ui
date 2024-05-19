import React, { useState, useEffect } from 'react';
import UserModel from '../models/UserModel'; // Kullanıcı modelini içe aktar
import '../styles/userForm.css'; // Kullanıcı formu için CSS dosyasını içe aktar

const UserForm = ({ onClose, onUserAdded }) => {
  // Form verileri için state
  const [formData, setFormData] = useState({
    avatar: '',
    name: '',
    username: '',
    email: '',
    role: ''
  });

  // Component yüklendiğinde localStorage'dan form verilerini al
  useEffect(() => {
    const storedFormData = localStorage.getItem('formData');
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);

  // Input değişikliklerini işleyen fonksiyon
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form submit edildiğinde yeni kullanıcı oluşturan fonksiyon
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userModel = new UserModel();
    try {
      await userModel.createUser(formData);
      console.log('Kullanıcı başarıyla oluşturuldu');
      // Form verilerini sıfırla
      setFormData({
        avatar: '',
        name: '',
        username: '',
        email: '',
        role: ''
      });
      onUserAdded(); // Kullanıcı eklendiğinde listeyi yenile
      onClose(); // Formu kapat
    } catch (error) {
      console.error('Kullanıcı oluşturulurken bir hata oluştu:', error);
    }
  };

  // Form verilerini localStorage'a kaydeden fonksiyon
  const saveFormDataToLocal = () => {
    localStorage.setItem('formData', JSON.stringify(formData));
  };

  return (
    <div className="user-form-container">
      <h2>Create User</h2>
      <form className="form" onSubmit={handleSubmit} onChange={saveFormDataToLocal}>
        <div className="form-inputs">
          {/* Form inputları */}
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
          <select name="role" value={formData.role} onChange={handleInputChange}>
            <option value="">Select Role</option>
            {/* Rollerin seçim listesi */}
            {['administrator', 'subscriber', 'author', 'contributor'].map((role) => (
              <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>
            ))}
          </select>
        </div>
        <div className="form-buttons">
          {/* Form butonları */}
          <button className="create-button" type="submit">Create User</button>
          <button className="close-button" onClick={onClose}>Close</button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
