import {collection, getDocs} from "firebase/firestore";
import { auth, db } from "../../configuration/firebase";
import { X } from "@mui/icons-material";
import { setExploreUsers } from "../actions";

export const fetchAllUsers = (uid, following=[]) => {
    return async (dispatch) => {
        const colRef = collection(db,'users');

        try{
            const snapshot = await getDocs(colRef);
            const documents = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
            let newUsers = documents.filter((user)=> user.uid !== uid && !following.includes(user.uid));
            console.log('newUsers',newUsers);
            let newExploreUsers = newUsers.map((user)=> {return {email:user.email, uid:user.uid,name: user.firstName+' '+user.lastName} });
            dispatch(setExploreUsers(newExploreUsers))
        }catch(e) {
                console.log('FetchAllUsersReduxError:',e.message)
        }
    }
}