import { doc, getDoc, setDoc } from "firebase/firestore";
import { signInWithGoogle } from "../../auth/auth";
import { initiateData, storeUserValue } from "../actions";
import { auth, db } from "../../configuration/firebase";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import {fetchAllUsers} from './newUserThunk.js';
import { initiateFeed } from "./feedThunk.js";

export const handleSignIn = () => {
  return async (dispatch) => {
   try{
    let user = await signInWithGoogle();
    dispatch(storeUserValue({ email: user.email, uid: user.uid }));
   const data =  await dispatch(checkifUserExists(user));
    await dispatch(fetchAllUsers(data.uid, data.following));
    await dispatch(initiateFeed(data.uid, data.following));
    toast.success('User Logged In successfully !!!!')

    return user.uid
   }
   catch(e){
    return null;
   }
    
  };
};

export const handleSignInManual = (username, password) => {
  return async (dispatch) => {
    try{
    let uid =   await signInWithEmailAndPassword(auth, username, password).then( async(userCredentials)=>{
      dispatch(checkifUserExists(userCredentials.user));
        dispatch(storeUserValue({email: userCredentials.user.email, uid: userCredentials.user.uid}))
        dispatch(fetchAllUsers(userCredentials.user.uid, userCredentials.user.following));
        dispatch(initiateFeed(userCredentials.user.uid, userCredentials.user.following))      
        
        toast.success('User Logged In successfully !!!!')
        return userCredentials.user.uid;
      })
      return uid;
    }catch(e) {
      toast.error('Errror!! Could not log In');
    }
  }
}

export const checkifUserExists = (user) => {
  return async (dispatch) => {

    try {
      const userDocRef = doc(db, "users", user.uid);

      const userDocSnap = await getDoc(userDocRef);
      if (!userDocSnap.exists()) {
        console.log('Does not exists');
        await setDoc(userDocRef, {
          email: user.email,
          uid: user.uid,
          firstName: user.displayName,
          lastName: "",
          following: [],
          followers: [],
          likes: [],
          comments: [],
          posts: [],
        });
        toast.success('New user Initiated');
        toast.success('Welcome To Devconnect');
        const data = { email: user.email, uid: user.uid, firstName: user.displayName, following: [] };
        dispatch(
          initiateData({...data, userName: user.displayName}));
        return { email: user.email, uid: user.uid, firstName: "", following: [] };
      } else {
        const data = {following: userDocSnap.data()?.following, email: userDocSnap.data().email, uid: userDocSnap.data().uid, userName: userDocSnap.data()?.firstName + " "+ userDocSnap.data()?.lastName, notifications: userDocSnap.data()?.notification}
        dispatch(initiateData(data))
        return data;
      }
    } catch (e) {
      console.log("error", e.message);
    }
  };
};
