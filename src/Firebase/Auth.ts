import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./Config";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


interface userInfo {
    uid: string | null, 
    displayName: string | null, 
    email: string | null, 
    photoURL: string | null
}


const addUser = async (userInfo: userInfo) => {
    try {     
        const userRef = collection(db, "users");
        await setDoc(doc(userRef, userInfo.email || ""), userInfo);
    } catch (error) {
        console.log(error);
    }
}


const signIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)                     // signInWithPopup pops up the google account auth window
        .then(() => {
            onAuthStateChanged(auth, (user) => {        // onAuthStateChanged function returns the user info 
                if (user) {                             // and handle the functionality after selecting the google account from auth window
                    const uid = user.uid;
                    const displayName = user.displayName;
                    const email = user.email;
                    const photoURL = user.photoURL;

                    const userInfo = { uid, displayName, email, photoURL };

                    addUser(userInfo)                   // storing `userInfo` in form of a doc in "users" collection

                    console.log(userInfo);

                    // add code to change auth state to `true` and update userInfo state in React code

                } else {
                    // add code to keep auth state `false` and userInfo state blank `{}` in React code
                }
            });
        })
        .catch((error: any) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);

            console.log(errorCode, errorMessage, email, credential);
        });
};


const logOut = () => {
    try {  
        onAuthStateChanged(auth, (user)=>{
             if (user) {
                 signOut(auth).then(() => {
                     console.log("user signed out")

                     // add code to change auth state to `false` and update userInfo state in React code

                 })
             }
         })
    } catch (error) {
        console.log(error);
    }
}


export { signIn, logOut };