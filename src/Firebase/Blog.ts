// createBlog(), updateBlog(), getBlog(), getAllBlogs(), deleteBlog()

import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db, userInfo } from "./Auth";
import { getUser } from "./Profile";


export interface blogInfo {
    blogTitle: string | null,
    blogText: string | null,
    previewImage: string | null
}

export interface blogger_commenter {
    userId: string | null,
    displayName: string | null,
    username: string | null,
    photoURL: string | null
}


const generateRandomString = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}


const createBlog = (blogInfo: blogInfo, user: userInfo) => {
    return new Promise(async (resolve, reject) => {

        const blogId: string = generateRandomString(25);            // creating unique blogID

        try {
            const docRef = doc(db, "blogs", blogId)
            const docSnap = await getDoc(docRef)

            if (!docSnap.exists()) {
                const bloggerInfo: any = await getUser(user);       // collecting some primary information of blogger to show in blog because,
                const blogger: blogger_commenter = {                // blogger's original document isn't accessible to everyone
                    userId: bloggerInfo.userId,
                    displayName: bloggerInfo.displayName, 
                    username: bloggerInfo.username,
                    photoURL: bloggerInfo.photoURL
                }
                const blogRef = collection(db, "blogs")
                await setDoc(doc(blogRef, blogId), { ...blogInfo, blogId, blogger })
                
                resolve("success");
            
            } else {
                const blogCreationStatus = await createBlog(blogInfo, user);           // recursive call to createBlog() if blogID != unique
                resolve(blogCreationStatus);
            }
        } catch (error) {
            console.log(error);
        }
    })
}


export { createBlog }