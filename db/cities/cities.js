import { db } from "../Config";
import {
  getDocs,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
// Get a list of cities from your database
var source;
async function getCities() {
  const citiesCol = collection(db, "cities");
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return cityList;
}

async function editCity(city) {
  if(source=="Local"){
  console.log("at editCity", city);
  await setDoc(doc(db, "cities", city.id), city);}
}

async function deleteCity(id) {
  if(source=="Local"){try {
  await deleteDoc(doc(db, "cities", id));
  console.log("Document deleted with ID: ", id);
} catch (error) {
  console.error("Error deleting document: ", error);
}
}}

async function addCity(city) {
  try {

    const docRef = await addDoc(collection(db, "cities"), city);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

function subscribe(callback) {
  const unsubscribe = onSnapshot(
    query(collection(db, "cities")),
    (snapshot) => {
      source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";
      snapshot.docChanges().forEach((change) => {
        
        if (callback) callback({ change, snapshot,source});
      });
      // console.log(source, " data: ", snapshot.data());
    }
  );
  return unsubscribe;
}

export { getCities, addCity, editCity, deleteCity, subscribe };
