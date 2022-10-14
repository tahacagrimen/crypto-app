import { useState } from "react";
import { createContext } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const FirebaseContext = createContext();

export function FirebaseProvider({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const provider = new GoogleAuthProvider();

  let navigate = useNavigate();

  const handleSignInWithEmail = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      })
      .then(() => {
        navigate("/overview");
      });
  };

  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      })
      .then(() => {
        navigate("/overview");
      });
  };

  return (
    <FirebaseContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        handleSignInWithEmail,
        handleSignInWithGoogle,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

export default FirebaseContext;
