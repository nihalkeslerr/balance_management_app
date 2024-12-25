import { db } from '../firebase/firebase';
import { doc, getDoc, collection, getDocs,setDoc } from 'firebase/firestore';

const defaultBalances = {
  subCollections: {
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
  }
};

export const getBalancesFromFirestore = async (userId) => {
  try {
    const docRef = doc(db, 'balances', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Belgenin temel verilerini alın
      const balances = docSnap.data();

      // Alt koleksiyonları almak için bir yapı oluştur
      const subCollections = {};
      const subCollectionRef = collection(db, 'balances', userId, 'balancesCollections'); // Alt koleksiyonun kökünü belirle
      const subCollectionSnapshot = await getDocs(subCollectionRef);

      subCollectionSnapshot.forEach((subDoc) => {
        subCollections[subDoc.id] = subDoc.data(); // Alt koleksiyondaki her belgeyi kaydet
      });

      return {
        ...balances,          // Ana belge verileri
        subCollections,       // Alt koleksiyon verileri
      };
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

export const createUserBalance = async (userId, initialBalances) => {
    const userDoc = doc(db, 'balances', userId); // `balances` koleksiyonunda kullanıcı `uid` ile belge oluştur
    try {
      await setDoc(userDoc, initialBalances, { merge: true }); // Varsayılan bakiyeleri oluştur
      console.log('Kullanıcı bakiyeleri başarıyla oluşturuldu.');
    } catch (error) {
      console.error('Bakiyeleri oluştururken hata oluştu:', error);
    }
  };