import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { app, db, auth, userInfo } from "./Auth";


interface updatedFields {
    userId?: string | null,
    displayName: string | null,
    username?: string | null,
    email?: string | null,
    photoURL?: string | null,
    authState?: boolean
}


const getUser = (user: userInfo) => {
    return new Promise(async (resolve, reject) => {
        const docRef = doc(db, "users", user.email || "")
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            resolve(docSnap.data());    // Document data
        } else {
            console.log("No such document!");
        }
    })
}


const updateUser = (user: userInfo, updatedInfo: updatedFields | any) => {
    return new Promise(async (resolve, reject) => {

        if (updatedInfo.username) {
            const username = updatedInfo.username

            const docRef = doc(db, "usernames", username)       // get particular doc from `usernames` collection
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                const collectionRef = collection(db, "usernames");                    // add doc to `usernames` collections
                await setDoc(doc(collectionRef, username), { username: username });

                const documentRef = doc(db, "users", user.email || "")              // adding/updating the 'username' field and other fields in user doc
                await updateDoc(documentRef, updatedInfo)
                resolve(true);

            } else {
                const userInfo: any = await getUser(user);

                if (docSnap.exists() && userInfo.username === username) {           // adding/updating the fields in user doc if the given username exists 
                    const documentRef = doc(db, "users", user.email || "")          // and belong to authenticated user doc
                    await updateDoc(documentRef, updatedInfo)
                    resolve(true);
                } else {
                    resolve(false)
                }
            }
        }
    })
}


const deleteUser = () => {
    // delete user doc from `users` collection
    // delete associate 'username' from the `usernames` collection by passing the username as document-ID
}




export { getUser, updateUser, deleteUser, };