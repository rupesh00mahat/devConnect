import { doc, getDoc } from "firebase/firestore"
import { db } from "../configuration/firebase"

export const fetchPosts = async(uid) => {
        try{
            const userDocRef = doc(db, 'users', uid);
            const fetchedDoc = await getDoc(userDocRef);
            return fetchedDoc.data()?.posts;
        }catch(e){
             console.log('error',e.message);
        }
    
}