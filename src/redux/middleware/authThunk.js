import { doc, getDoc, setDoc } from "firebase/firestore";
import { signInWithGoogle } from "../../auth/auth";
import { initiateData, storeUserValue } from "../actions";
import { db } from "../../configuration/firebase";
import { toast } from "react-toastify";

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
