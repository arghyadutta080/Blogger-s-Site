// createComment(), deleteComment(), displayComments()

// comment interface and blogger_commenter interface need to include in comment document as data

/* comment interface includes
    1. commentId
    2. commentText
    3. blogId -> to apply the query to show all the comments below that respected blog
    4. bloggerId -> to apply the query to show all the comments at blogger's dashboard
                 -> can be accessed from the blog document using the 'blogId'
*/