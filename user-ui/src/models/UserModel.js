import userData from '../mockData/users.json'; // Örnek kullanıcı verilerini içe aktar

class UserModel {
    // Kullanıcıları almak için asenkron bir fonksiyon
    getUsers = async () => {
        try {
            const response = await fetch('https://6649d5f24032b1331beef33b.mockapi.io/api/users');
            if (!response.ok) {
                throw new Error('Kullanıcıları alma başarısız.');
            }
            const data = await response.json(); // Yanıtı JSON olarak al
            return data; // Verileri döndür
        } catch (error) {
            console.error('Kullanıcıları alma hatası:', error.message); // Hata durumunda konsola hata mesajını yazdır
            throw error; // Hata nesnesini fırlat
        }
    };

    // Kullanıcı oluşturmak için asenkron bir fonksiyon
    createUser = async (userData) => {
        try {
            const response = await fetch('https://6649d5f24032b1331beef33b.mockapi.io/api/users', {
                method: 'POST', // POST isteği
                headers: {
                    'Content-Type': 'application/json', // JSON içerik tipi
                },
                body: JSON.stringify(userData), // Kullanıcı verilerini JSON olarak gönder
            });

            if (!response.ok) {
                throw new Error('Kullanıcı oluşturma başarısız.');
            }

            const data = await response.json(); // Yanıtı JSON olarak al
            return data; // Verileri döndür
        } catch (error) {
            console.error('Kullanıcı oluşturma hatası:', error.message); // Hata durumunda konsola hata mesajını yazdır
            throw error; // Hata nesnesini fırlat
        }
    };

    // Kullanıcı güncellemek için asenkron bir fonksiyon
    updateUser = async (userId, userData) => {
        try {
            const response = await fetch(`https://6649d5f24032b1331beef33b.mockapi.io/api/users/${userId}`, {
                method: 'PUT', // PUT isteği
                headers: {
                    'Content-Type': 'application/json' // JSON içerik tipi
                },
                body: JSON.stringify(userData) // Kullanıcı verilerini JSON olarak gönder
            });
            if (!response.ok) {
                throw new Error('Kullanıcı güncellenirken bir hata oluştu');
            }
            return await response.json(); // Yanıtı JSON olarak al
        } catch (error) {
            console.error('Kullanıcı güncellenirken bir hata oluştu:', error); // Hata durumunda konsola hata mesajını yazdır
            throw error; // Hata nesnesini fırlat
        }
    };

    // Kullanıcı silmek için asenkron bir fonksiyon
    deleteUser = async (userId) => {
        try {
            const response = await fetch(`https://6649d5f24032b1331beef33b.mockapi.io/api/users/${userId}`, {
                method: 'DELETE' // DELETE isteği
            });
            if (!response.ok) {
                throw new Error('Kullanıcı silinirken bir hata oluştu');
            }
            return await response.json(); // Yanıtı JSON olarak al
        } catch (error) {
            console.error('Kullanıcı silinirken bir hata oluştu:', error); // Hata durumunda konsola hata mesajını yazdır
            throw error; // Hata nesnesini fırlat
        }
    };

    // Rolüne göre kullanıcıları filtrelemek için asenkron bir fonksiyon
    filterUsersByRole = async (role) => {
      try {
        const response = await fetch(`https://6649d5f24032b1331beef33b.mockapi.io/api/users?role=${role}`);
        if (!response.ok) {
          throw new Error('Kullanıcıları filtreleme başarısız.');
        }
        const filteredUsers = await response.json(); // Yanıtı JSON olarak al
        return filteredUsers; // Filtrelenmiş kullanıcıları döndür
      } catch (error) {
        console.error('Kullanıcıları filtreleme hatası:', error.message); // Hata durumunda konsola hata mesajını yazdır
        throw error; // Hata nesnesini fırlat
      }
    };
    

    // Kullanıcıyı kullanıcı dizisine dönüştürmek için asenkron bir fonksiyon
    convertToUserArray = async () => {
        const user = JSON.parse(localStorage.getItem('user')); // LocalStorage'dan kullanıcı verisini al
        if (user) {
            if (!Array.isArray(user)) { // Eğer kullanıcı verisi dizi değilse
                const userArray = [user]; // Kullanıcı verisini diziye dönüştür
                localStorage.setItem('user', JSON.stringify(userArray)); // Dönüştürülmüş kullanıcı verisini LocalStorage'a kaydet
            }
        } else {
            localStorage.setItem('user', JSON.stringify([])); // Eğer kullanıcı verisi yoksa, boş bir dizi olarak kaydet
        }
    };
}

export default UserModel; // UserModel sınıfını dışa aktar
