import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../configuration/firebase"
import { toast } from "react-toastify";
import { addToFeed } from "../actions";

export const createNewPost = (text, uid) => {
    return async(dispatch) => {
        try{
            console.log('text and uid', text, uid);
            const userDocRef = doc(db, 'users', uid);
            await updateDoc(userDocRef, {
                posts: arrayUnion({text, photo: '', likes: [], comments:[]})
            }).then(()=>{
                    dispatch(fetchPosts(uid))
            }) 
            toast.success('Post created successfully');
        }catch(e){
            toast.error('Error:', e.message);
            console.log('Hello', e.message);
        }
    }   
}

export const fetchPosts = (uid) =>{
return async (dispatch) => {
    try{
        const userDocRef = doc(db,'users', uid);
        const fetchedDoc = await getDoc(userDocRef);
        console.log('fetchedDoc', fetchedDoc.data()?.posts);
        dispatch(addToFeed(fetchedDoc.data()?.posts));
    }catch(e){

    }
}
}