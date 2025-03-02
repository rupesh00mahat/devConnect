import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../configuration/firebase";

export const signInWithGoogle = async () => {
    try{
        const result = await signInWithPopup(auth, googleProvider);
        return result.user;
    }catch(error){
        console.error('Google Sign In Error:', error);
        throw error;
    }
};
