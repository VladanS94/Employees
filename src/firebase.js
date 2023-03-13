import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCBhHHOOsVyvyEg5pwlKwxP0w3kff5Wh0g",
  authDomain: "employee-d8db0.firebaseapp.com",
  projectId: "employee-d8db0",
  storageBucket: "employee-d8db0.appspot.com",
  messagingSenderId: "235316361692",
  appId: "1:235316361692:web:9269b5be594d45cb0b7719",
};

initializeApp(firebaseConfig);
const db = getFirestore();

export const setInfo = async (collectionName, data) => {
  await addDoc(collection(db, collectionName), data);
};

export const getCollection = async (collectionName, state) => {
  let response = await getDocs(collection(db, collectionName));
  let my_collection = response.docs.map((doc) => doc.data());
  state(my_collection);
};

export const updateDocument = async (docName, data) => {
  await updateDoc(doc(db, "Employees", docName), data);
};

export const getCollectionSnapshot = async (collectionName, state) => {
  onSnapshot(collection(db, collectionName), (snapshot) => {
    let response = snapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        documentid: doc.id,
      };
    });
    state(response);
  });
};

export const addTask = async (docName, data) => {
    await setDoc(doc(db, "Employees", docName), data);
};

export const deleteDocument = async (docName) => {
    deleteDoc(doc(db, "Employees", docName));
};

// const user = {
//     fullName:"Ivan Ristic",
//     email: "rista7@yahoo.com",
//     phoneNumber: 381658415254,
//     dateOfBirth: 1678553472245,
//     monthlySalary: 25000,
//     tasks: [{
//         title: "Create App",
//         description: "Finish this app",
//         assignee: "",
//         dueDate: 1678553472245
//     }]
// }
