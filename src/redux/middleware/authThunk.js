import { doc, getDoc, setDoc } from "firebase/firestore";
import { signInWithGoogle } from "../../auth/auth";
import { initiateData, storeUserValue } from "../actions";
import { auth, db } from "../../configuration/firebase";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import {fetchAllUsers} from './newUserThunk.js';

export const handleSignIn = () => {
  return async (dispatch) => {
   try{
    let user = await signInWithGoogle();
    console.log("user", user);
    dispatch(storeUserValue({ email: user.email, uid: user.uid }));
    await dispatch(checkifUserExists(user));
    return user.uid
   }
   catch(e){
    console.log('Entered here');
    console.log('error', e.message);
    return null;
   }
    
  };
};

export const handleSignInManual = (username, password) => {
  return async (dispatch) => {
    try{
    let uid =   await signInWithEmailAndPassword(auth, username, password).then( async(userCredentials)=>{
        dispatch(storeUserValue({email: userCredentials.user.email, uid: userCredentials.user.uid}))
        dispatch(fetchAllUsers(userCredentials.user.uid, userCredentials.user.following));

        toast.success('User Logged In successfully !!!!')
        console.log('uc',userCredentials.user.uid);
        return userCredentials.user.uid;
      })
      return uid;
    }catch(e) {
      toast.error('Errror!! Could not log In');
      console.log(e.message);
    }
  }
}

export const checkifUserExists = (user) => {
  return async (dispatch) => {

    try {
      const userDocRef = doc(db, "users", user.uid);

      const userDocSnap = await getDoc(userDocRef);
      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, {
          email: user.email,
          uid: user.uid,
          firstName: "",
          lastName: "",
          following: [],
          followers: [],
          likes: [],
          comments: [],
          posts: [],
        });
        toast.success('New user Initiated');
        toast.success('Welcome To Devconnect');
        dispatch(
          initiateData({ email: user.email, uid: user.uid, firstName: "", following: [] })
        );
      } else {
        dispatch(initiateData({following: userDocSnap.data()?.following, email: userDocSnap.data().email, uid: userDocSnap.data()}))
      }
    } catch (e) {
      console.log("error", e.message);
    }
  };
};
