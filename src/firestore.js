// firestore.js
import { db } from './firebase-config.js';
import { doc, setDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

export async function saveUserProfile(uid, name, email, teach, learn) {
    try {
        await setDoc(doc(db, "users", uid), {
            name: name,
            email: email,
            teach: teach,
            learn: learn
        });
        console.log("Profile saved!");
    } catch (error) {
        console.error("Error saving profile:", error);
    }
}

export async function getAllUsers() {
    const usersCol = collection(db, 'users');
    const snapshot = await getDocs(usersCol);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
