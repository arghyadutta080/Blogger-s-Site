import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import { auth, db } from "./Auth.ts"
import { blogger_commenter, getBlog } from "./Blog.ts"
import { getUser } from "./Profile.ts"


export interface comment {
    commentText: string,
    blogId: string,
}


const createComment = (comment: comment) => {
    return new Promise(async (resolve, reject) => {
        try {
            const commenterInfo: any = await getUser()
            const commenter: blogger_commenter = {
                userId: commenterInfo.userId,
                displayName: commenterInfo.displayName,
                username: commenterInfo.username,
                photoURL: commenterInfo.photoURL
            }
            const blog: any = await getBlog(comment.blogId)     // fetching bloggerId for the particular blog from `blogs` collection using getBlog()
            const bloggerId = blog.blogger.userId;

            await addDoc(collection(db, "comments"), { ...comment, bloggerId, commenter })

            resolve("success");

        } catch (error) {
            reject(error);
        }
    })
}


const getMyComments = () => {       // query for comparing auth_user_uid(passed as parameter) with bloggerId in comment document 
    return new Promise(async (resolve, reject) => {
        try {
            const user = auth.currentUser;

            if (user != null) {
                const q = query(collection(db, "comments"), where("bloggerId", "==", user.uid));
                const querySnapshot = await getDocs(q);

                var myComments: any[] = [];

                querySnapshot.forEach((doc) => {
                    myComments = [...myComments, { commentId: doc.id, comment: doc.data() }]
                });

                resolve(myComments);
            }

        } catch (error) {
            reject(error);
        }
    })
}


const getBlogComments = (blogId: string) => {           // query for comparing blog's blogId(passed as parameter) with blogId in comment document
    return new Promise(async (resolve, reject) => {
        try {
            const q = query(collection(db, "comments"), where("blogId", "==", blogId));
            const querySnapshot = await getDocs(q);

            var blogComments: any[] = [];

            querySnapshot.forEach((doc) => {
                blogComments = [...blogComments, { commentId: doc.id, comment: doc.data() }]
            });

            resolve(blogComments);

        } catch (error) {
            reject(error);
        }
    })
}


const deleteComment = () => {       // pass commentId as parameter

}

export { createComment, getBlogComments, getMyComments, deleteComment }