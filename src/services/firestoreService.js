import { db } from '../firebase/firebase';
import { doc, getDoc, collection, addDoc,setDoc, updateDoc,getDocs} from 'firebase/firestore';

/****************** Balance Functions  /***************** */
const defaultBalances = {
    cash: {
      id: 2,
      amount: 0,
      type: 'Nakit Bakiyesi'
    },
    flight: {
      id: 3,
      amount: 0,
      type: 'Uçak Bakiyesi'
    },
    fuel: {
      id: 1,
      amount: 0,
      type: 'Yakıt Bakiyesi'
    },
    meal: {
      id: 5,
      amount: 0,
      type: 'Yemek Bakiyesi'
    },
    toll: {
      id: 4,
      amount: 0,
      type: 'Yol Geçiş Bakiyesi'
    }
};

/**
 * Belirli bir kullanıcının bakiye bilgilerini getirir
 * @param {string} userId Kullanıcının UID'si
 */

export const getBalancesFromFirestore = async (userId) => {
  try {
    const docRef = doc(db, 'balances', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data(); 

    } else {
      console.log('No such document!');
      createUserBalance(userId, defaultBalances);
      
      return null;
    }
  } catch (error) {
    console.error('Error getting document: ', error);
    return null;
  }
};

/**
 * Belirli bir kullanıcının için default bakiyeler oluşturur.
 * @param {string} userId Kullanıcının UID'si
 * @param {object} initialBalances default bakiye objesi
 */

export const createUserBalance = async (userId, initialBalances) => {
  const userDoc = doc(db, 'balances', userId); // balances koleksiyonunda kullanıcı id ile belge oluştur
  try {
    await setDoc(userDoc, initialBalances, { merge: true }); // Varsayılan bakiyeleri oluştur
    console.log('Kullanıcı bakiyeleri başarıyla oluşturuldu.');
  } catch (error) {
    console.error('Bakiyeleri oluştururken hata oluştu:', error);
  }
};

/**
 * Belirli bir kullanıcının alt koleksiyonundaki amount değerini günceller.
 * @param {string} userId Kullanıcının user id
 * @param {string} balanceId bakiye id 
 * @param {number} newAmount Yeni amount değeri
 */

export const updateBalanceById = async (userId, balanceId, newAmount) => {
  try {
    const docRef = doc(db, 'balances', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const balances = docSnap.data();

      // İlgili balance alanını id ye göre bul
      const balanceKey = Object.keys(balances).find(
        (key) => balances[key].id === balanceId
      );

      if (balanceKey) {
        await updateDoc(docRef, {
          [`${balanceKey}.amount`]: newAmount,
        });

        console.log(`ID ${balanceId} için amount başarıyla güncellendi: ${newAmount}`);
        return true; 
      } else {
        console.log(`ID ${balanceId} ile eşleşen bir balance bulunamadı.`);
        return false; 
      }
    } else {
      console.log('Kullanıcı bakiyeleri dokümanı bulunamadı.');
      return false; 
    }
  } catch (error) {
    console.error('Bakiyeyi güncellerken hata oluştu:', error);
    return false; 
  }
};


/****************** Coupon Functions  /***************** */

/**
 * Belirli bir kullanıcının kupon bilgilerini getirir
 * @param {string} userId Kullanıcı UID
 */

export const getUserCoupons = async (userId) => {
  try {
    const userCouponsCollection = collection(db, 'coupons', userId, 'userCoupons');
    const querySnapshot = await getDocs(userCouponsCollection);

    const coupons = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log('Kuponlar başarıyla alındı:', coupons);
    return coupons;
  } catch (error) {
    console.error('Kuponları alırken hata oluştu:', error);
    return [];
  }
};

/**
 * Belirli bir kullanıcı için kupon oluşturur.
 * @param {string} userId Kullanıcı UID si
 * @param {object} couponInfo Kupon objesi
 */

export const createUserCoupon = async (userId, couponInfo) => {
  const userCouponsCollection = collection(db, 'coupons', userId, 'userCoupons'); // Kullanıcının kuponları için sub koleksiyon
  try {
    const docRef = await addDoc(userCouponsCollection, couponInfo); // Yeni bir kupon ekle
    console.log('Kupon başarıyla oluşturuldu. ID:', docRef.id);
    return { id: docRef.id, ...couponInfo }; // Yeni oluşturulan kuponun verilerini döndür
  } catch (error) {
    console.error('Kupon oluştururken hata oluştu:', error);
    return null;
  }
};