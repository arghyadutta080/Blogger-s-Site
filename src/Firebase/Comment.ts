import { addDoc, collection } from "firebase/firestore"
import { db, userInfo } from "./Auth"
import { blogger_commenter, getBlog } from "./Blog"
import { getUser } from "./Profile"


export interface comment {
    commentText: string,
    blogId: string,
}


const createComment = (comment: comment, user: userInfo) => {
    return new Promise(async (resolve, reject) => {
        try {
            const commenterInfo: any = await getUser(user)
            const commenter: blogger_commenter = {
                userId: commenterInfo.userId,
                displayName: commenterInfo.displayName,
                username: commenterInfo.username,
                photoURL: commenterInfo.photoURL
            }
            const blog: any = await getBlog(comment.blogId)
            const bloggerId = blog.blogger.userId;

            await addDoc(collection(db, "comments"), { ...comment, bloggerId, commenter })

            resolve("success");

        } catch (error) {
            console.log(error);
        }
    })
}


const getMyComments = () => {       // query for comparing auth_user_uid(passed as parameter) with bloggerId in comment document 

}


const getBlogComments = () => {     // query for comparing blog's blogId(passed as parameter) with blogId in comment document

}


const deleteComment = () => {       // pass commentId as parameter

}

export { createComment, getBlogComments, getMyComments, deleteComment }