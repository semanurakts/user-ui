import React from 'react';
import '../styles/navbar.css'; // Navbar için CSS dosyasını içe aktar

const Navbar = ({ handleAddUserClick, handleRoleFilter }) => {
  // Rol filtresi butonlarına tıklama işlemini yöneten fonksiyon
  const handleRoleClick = (role) => {
    handleRoleFilter(role);
  };

  return (
    <nav className="navbar"> {/* Navbar bileşeni */}
      <div className="navbar-left">
        <span>Users</span> {/* Kullanıcılar başlığı */}
      </div>{/* Orta kısım */}
      <div className="navbar-center">
        {/* Rol filtresi butonları */}
        <button onClick={() => handleRoleClick('all')}>All Users</button>
        <button onClick={() => handleRoleClick('Administrator')}>Administrator</button>
        <button onClick={() => handleRoleClick('Subscriber')}>Subscriber</button>
        <button onClick={() => handleRoleClick('Author')}>Author</button>
        <button onClick={() => handleRoleClick('Contributor')}>Contributor</button>
      </div>
      {/* Sağ kısım */}
      <div className="navbar-right">
        <span onClick={handleAddUserClick}>Add New User</span> {/* Yeni kullanıcı ekleme butonu */}
      </div>
    </nav>
  );
};

export default Navbar;
