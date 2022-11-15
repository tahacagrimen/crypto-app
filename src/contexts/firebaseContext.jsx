import { useState } from "react";
import { createContext } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { addDoc, doc, setDoc, Timestamp } from "firebase/firestore";

const FirebaseContext = createContext();

export function FirebaseProvider({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uid, setUid] = useState("");
  const [pic, setPic] = useState("");
  const [name, setName] = useState("");
  const provider = new GoogleAuthProvider();

  let navigate = useNavigate();

  const handleCreateUserWithEmail = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          navigate("/overview");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const handleSignInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setPic(user.photoURL);
        setEmail(user.email);
        setUid(user.uid);
        setName(user.displayName);
        if (user) {
          navigate("/overview");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        window.location.reload(false);
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const handleSetDoc = async (userUid, coin, price, amount) => {
    await addDoc(doc(db, userUid, coin), {
      Timestamp: { buying_price: price, buying_amount: amount },
    });
  };

  return (
    <FirebaseContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        handleCreateUserWithEmail,
        handleSignInWithGoogle,
        name,
        setName,
        uid,
        setUid,
        setPic,
        pic,
        handleLogout,
        handleSetDoc,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

export default FirebaseContext;
