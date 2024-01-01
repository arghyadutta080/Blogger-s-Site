import { collection, getDocs } from "firebase/firestore";
import { db } from "./Auth";


// FIREBASE SECURITY RULES ARE TESTING WITH THE BELOW FUNCTIONS


// All user details cann't be displayed publicly due to security rules

const getAllUsers = async () => {        
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc: any) => {
            console.log(doc.id, " => ", doc.data());
        });
    } catch (error) {
        console.log(error)
    }
}

export { getAllUsers }
