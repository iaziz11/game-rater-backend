import { db } from "./firebase.js";
import { doc, getDoc } from "firebase/firestore";

async function getListsFromUser(userId) {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(docSnap.data());
    } else {
      console.log("No user found.");
    }
  } catch (e) {
    console.log(e.message);
  }
}

export { getListsFromUser };
