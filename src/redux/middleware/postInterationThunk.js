import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../configuration/firebase";
import { toast } from "react-toastify";

export const createNewPost = (text, uid, email, fullName, postId) => {
  return async (dispatch) => {
    try {
      const userDocRef = doc(db, "users", uid);
      await updateDoc(userDocRef, {
        posts: arrayUnion({
          text,
          photo: "",
          likes: [],
          comments: [],
          data: new Date(),
          email,
          fullName,
          postId, posterId: uid
        }),
      })
      toast.success("Post created successfully");
    } catch (e) {
      toast.error("Error:", e.message);
      console.log(e.message);
    }
  };
};

export const followUser =(userId, uid) => {
    return async (dispatch) => {
        try{
            const userDocRef = doc(db, "users", userId);
            await updateDoc(userDocRef,{
                following: arrayUnion(uid)
            }).then(()=>{
                toast.success('Followed User Successfully !!!');
            });
        }catch (e){
toast.success('Error !! Cannot follow user.');
console.log('FollowUserError:', e.message);
        }
    }
}

export const likePost = (userId, postId, posterId) => {
  return async (dispatch) => {
    console.log('likePost', userId, postId, posterId);
    try{
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, {
        likes: arrayUnion({postId, posterId})
      })
      const posterDocRef = doc(db, "users",posterId);
     const posterDocSnap = await getDoc(posterDocRef);
     if(posterDocSnap.exists()){
      let posts = posterDocSnap.data()?.posts;
      let likedPost = posts.filter((post)=>  post.postId == postId);
      await updateDoc(posterDocRef, {
        posts: arrayRemove(likedPost[0])
      });
     const updatedPost = {...likedPost[0],likes: [...likedPost[0].likes, userId]}
     await updateDoc(posterDocRef, {
      posts: arrayUnion(updatedPost),
      notification: arrayUnion('Your post has one new like.'),
     });
     }
     toast.success('Liked Post');
    }catch(e){
      toast.error('ERRor: cannot like Post. Please try again');
      console.log(e.message);
    }
  }
}


export const commentPost = (userId, postId, posterId, comment, time, commentId) => {
  return async (dispatch) => {
    try{
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, {
        comments: arrayUnion({postId, posterId, comment, time, commentId})
      })
      const posterDocRef = doc(db, "users",posterId);
     const posterDocSnap = await getDoc(posterDocRef);
     if(posterDocSnap.exists()){
      let posts = posterDocSnap.data()?.posts;
      let commentedPost = posts.filter((post)=>  post.postId == postId);
      await updateDoc(posterDocRef, {
        posts: arrayRemove(commentedPost[0])
      })
     const updatedPost = {...commentedPost[0],comments: [...commentedPost[0].comments, {postId, posterId, comment, time, commentId, commenterId: userId}]}
     await updateDoc(posterDocRef, {
      posts: arrayUnion(updatedPost),
      notifications: arrayUnion('Your post has one new comment'),
     });
     }
     toast.success('Comment Posted succesfully');
    }catch(e){
      toast.error('ERRor: cannot comment on Post. Please try again');
      console.log(e.message);
    }
  }
}