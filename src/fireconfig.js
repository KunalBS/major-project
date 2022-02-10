import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6mYC66P7BkppnlczLqUDO-LfItvMFf40",
  authDomain: "ecom-35503.firebaseapp.com",
  projectId: "ecom-35503",
  storageBucket: "ecom-35503.appspot.com",
  messagingSenderId: "601992907534",
  appId: "1:601992907534:web:664e1d33495c65d91ce55f",
  measurementId: "G-TD96P1FRJD"
};

const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);

export default fireDB;