// createBlog(), updateBlog(), getBlog(), getAllBlogs(), deleteBlog()

import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db, userInfo } from "./Auth";
import { getUser } from "./Profile";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";


export interface blogInfo {
    blogTitle: string | null,
    blogText: string | null,
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


const createImgURL = (fileId: string, file: Blob | Uint8Array | ArrayBuffer) => {
    return new Promise(async (resolve, reject) => {

        const storage = getStorage();
        const fileRef = ref(storage, fileId);

        await uploadBytes(fileRef, file);       // uploading img in firebase storage from the blob or file containing the img

        getDownloadURL(fileRef).then((url: any) => {        // getting that image url, uploaded in cloud
            console.log("img url ", url)
            resolve(url)
        })
    })
}


const createBlog = (blogInfo: blogInfo, imgFile: Blob | Uint8Array | ArrayBuffer, user: userInfo) => {
    return new Promise(async (resolve, reject) => {

        const blogId: string = generateRandomString(25);            // creating unique blogID

        try {
            const docRef = doc(db, "blogs", blogId)
            const docSnap = await getDoc(docRef)

            if (!docSnap.exists()) {
                const bloggerInfo: any = await getUser(user);       // collecting some primary information of blogger to show in blog because,
                const blogger: blogger_commenter = {                // blogger's original document isn't accessible to everyone, here user = auth.currentuser
                    userId: bloggerInfo.userId,
                    displayName: bloggerInfo.displayName,
                    username: bloggerInfo.username,
                    photoURL: bloggerInfo.photoURL
                }
                const previewImg = await createImgURL(blogId, imgFile)

                const collectionRef = collection(db, "blogs")
                await setDoc(doc(collectionRef, blogId), { ...blogInfo, blogId, blogger, previewImg })

                resolve("success");

            } else {
                const blogCreationStatus = await createBlog(blogInfo, imgFile, user);           // recursive call to createBlog() if blogID != unique
                resolve(blogCreationStatus);
            }
        } catch (error) {
            console.log(error);
        }
    })
}


export { createBlog }