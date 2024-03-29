import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./Config.ts";
import { getFirestore, collection, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export interface userInfo {
    userId?: string | null,
    displayName: string | null,
    username?: string | null,
    email: string | null,
    photoURL: string | null,
    authState?: boolean
    field?: string
}


const addUser = async (userInfo: userInfo) => {
    try {
        const docRef = doc(db, "users", userInfo.email || "")
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            const collectionRef = collection(db, "users");
            await setDoc(doc(collectionRef, userInfo.email || ""), userInfo);
        }
    } catch (error) {
        console.log(error);
    }
}
 

const signIn = () => {
    const provider = new GoogleAuthProvider();

    return new Promise((resolve) => {     
        signInWithPopup(auth, provider)                     // signInWithPopup pops up the google account auth window
            .then((result) => {
                const user = result.user
                if (user) {
                    const userId = user.uid;
                    const displayName = user.displayName;
                    const email = user.email;
                    const photoURL = user.photoURL;

                    const userInfo = { userId, displayName, email, photoURL, username: "", field: "" ,authState: true };

                    addUser(userInfo)                   // storing `userInfo` in form of a document in "users" collection

                    // console.log("Signed In user details ", userInfo);

                    resolve(userInfo);

                } else {
                    resolve({ authState: false });
                }
            })
            .catch((error: any) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);

                console.log(errorCode, errorMessage, email, credential);
            });
    })
};


const AuthState = () => {

    return new Promise((resolve) => {
        try {
            onAuthStateChanged(auth, (user) => {        // onAuthStateChanged function returns the user info 
                if (user) {                             // and handle the functionality after selecting the google account from auth window
                    resolve({ authState: true });
                } else {
                    resolve({ authState: false });
                }
            })

        } catch (error) {
            resolve({ authState: false });
        }
    })
}


const logOut = () => {
    return new Promise((resolve, reject) => {
        try {
            const user = auth.currentUser;
            if (user !== null) {
                signOut(auth).then(() => {
                    console.log("user signed out")
                    resolve({ authState: false });
                })
            } else {
                reject("Cann't logout. No user logged In!")
            }
            
        } catch (error) {
            console.log(error);
        }
    })
}


export { signIn, logOut, AuthState, app, db, auth };