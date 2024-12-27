# React Bakiye Yönetimi Uygulaması

Bu proje, kullanıcıların bakiyelerini yönetebildiği, ödeme yapabildiği ve kupon oluşturabildiği bir uygulamadır. **React**, **Redux** ve **Firebase** kullanılarak geliştirilmiştir.

## 📋 Proje Gereksinimleri

- **Giriş Sayfası**: Kullanıcılar, basit bir giriş ekranından oturum açabilir.
- **Bakiyeler Sayfası**:
  - Farklı tipteki bakiyeleri görebilir.
  - Bakiyeler hem kart yapısı hem de tablo şeklinde görüntülenebilir.
  - Bakiyeler Redux store’da tutulur.
- **Ödeme Yapısı**:
  - Kullanıcı bakiyesini kredi kartı veya kredi yöntemiyle artırabilir.
- **Kupon Oluşturma**:
  - Kullanıcı bakiyelerinden kupon oluşturabilir.
  - Kuponlar Redux store’a kaydedilir ve ayrı bir sayfada görüntülenebilir.
- **State Yönetimi**: Redux kullanılarak bakiyeler, kuponlar ve kullanıcı bilgileri yönetilir.
- **Veri Depolama**: Firebase kullanılarak veriler senkronize edilir.
- **Responsive Tasarım**: UI tasarımı Tailwind CSS ile desteklenmiştir.

---

## 🚀 Özellikler

1. **Giriş Sayfası**
   - Basit bir kullanıcı adı ve şifre ile giriş yapılabilir. Firebase Authentication opsiyonel olarak desteklenmektedir.
   
2. **Bakiyeler Yönetimi**
   - Yakıt, Nakit, Uçuş, Yol Geçiş ve Yemek bakiyelerini görüntüleyebilirsiniz.
   - "Kupon Oluştur" butonuyla bakiyenizden kupon oluşturabilirsiniz.

3. **Ödeme Yöntemleri**
   - **Kredi Kartı Ödeme**:
     - CVV kontrolüne bağlı olarak ödeme başarılı ya da başarısız olur.
   - **Kredi ile Ödeme**:
     - 10.000 TL üzerindeki krediler reddedilir.
     - 10.000 TL altındaki krediler onaylanır.

4. **Kupon Yönetimi**
   - Kupon oluşturulduktan sonra ayrı bir tabloda görüntülenebilir.

5. **State Yönetimi**
   - Redux store üzerinden bakiyeler ve kuponlar yönetilir.

6. **Firebase Entegrasyonu**
   - Firestore kullanılarak veriler senkronize edilir. Firebase kullanılamıyorsa, LocalStorage desteklenmektedir.

---

## 📦 Kurulum

### 1. Depoyu Klonlayın
```bash
git clone https://github.com/yourusername/react-balance-management.git
cd react-balance-management
```
### 2. Bağımlılıkları Kurun
```bash
npm install
```

### 3. Firebase Konfigürasyonu

- **Firebase Console üzerinden yeni bir proje oluşturun.**
- **Firestore Database'i etkinleştirin.**
- **src/firebase/firebase.js dosyasını açın ve aşağıdaki formatta yapılandırma bilgilerinizi ekleyin:**
   
```bash
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {app, auth, db};
```

### 4. Projeyi Başlatın

```bash
npm start
```

## 🛠️ Kullanılan Teknolojiler

- **React**: Kullanıcı arayüzü oluşturmak için.
- **Redux**: State yönetimi için.
- **Firebase**: Veri depolama ve senkronizasyon için.
- **Tailwind CSS, Bootstrap, css**: Responsive ve modern UI tasarımı için.

## 🌟 Kullanım
- **Giriş Yapın:** Mock API veya Firebase Authentication ile giriş yapın.
- **Bakiyeleri Görüntüleyin:** Ana sayfada veya tabloda bakiyelerinizi görün.
- **Ödeme Yapın:** Kredi kartı veya kredi yöntemiyle bakiye artırın.
- **Kupon Oluşturun:** Bakiyenizden kupon oluşturun ve kuponlarınızı görüntüleyin.