import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth, db } from "../lib/firebase";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { LOGIN_PATH, ROOT_PATH } from "../lib/routes";
import isUsernameExists from "../utils/isUsernameExists";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        try {
          const ref = doc(db, "users", authUser.uid);
          const docSnap = await getDoc(ref);
          setUser(
            docSnap.exists()
              ? docSnap.data()
              : { uid: authUser.uid, email: authUser.email }
          );
        } catch (err) {
          setError(err);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to Access Auth Context
export const useAuth = () => useContext(AuthContext);

export function useGoogleLogin() {
  const [isLoadingGoogle, setLoadingGoogle] = useState(false);
  // const toast = useToast();
  const navigate = useNavigate();
  async function googleSignIn({ redirectTo = ROOT_PATH }) {
    setLoadingGoogle(true);
    try {
      const googleAuthProvider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, googleAuthProvider);
      console.log("response google auth: " + JSON.stringify(res));
      const userRef = doc(db, "users", res.user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          id: res.user.uid,
          username: res.user.email,
          avatar: res.user.photoURL,
          date: Date.now(),
          role: "user",
        });
      }
      toast.success("You are logged in", {
        isClosable: true,
        autoClose: 3000,
      });
      navigate(redirectTo);
    } catch (error) {
      toast.error("Logging in failed", {
        isClosable: true,
        autoClose: 3000,
      });
      setLoadingGoogle(false);
    } finally {
      setLoadingGoogle(false);
    }
  }

  return { googleSignIn, isLoadingGoogle };
}

// This code is for Login functionlity
export function useLogin() {
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function login({ email, password, redirectTo = ROOT_PATH }) {
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("You are logged in", {
        isClosable: true,
        autoClose: 3000,
      });

      navigate(redirectTo);
    } catch (error) {
      toast.error("Logging in failed", {
        isClosable: true,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  }

  return { login, isLoading };
}

// This code is for logout functionlity
export function useLogout() {
  const [signOut, isLoading, error] = useSignOut(auth);

  const navigate = useNavigate();

  async function logout() {
    if (await signOut()) {
      toast.success("Successfully logged out", {
        isClosable: true,
        autoClose: 3000,
      });

      navigate(LOGIN_PATH);
    }
  }

  return { logout, isLoading };
}

// This code is for user register functionlity
export function useRegister() {
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function register({
    username,
    email,
    password,
    redirectTo = ROOT_PATH,
  }) {
    setLoading(true);

    const usernameExists = await isUsernameExists(username);

    if (usernameExists) {
      toast.error("Username already exists", {
        isClosable: true,
        autoClose: 3000,
      });

      setLoading(false);
    } else {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        console.log("response create user: " + JSON.stringify(res));
        await setDoc(doc(db, "users", res.user.uid), {
          id: res.user.uid,
          username: username.toLowerCase(),
          avatar: "",
          date: Date.now(),
          role: "user",
        });
        toast.success("Account created", {
          isClosable: true,
          autoClose: 3000,
        });

        navigate(redirectTo);
      } catch (error) {
        console.log("error: " + JSON.stringify(error));
        toast.error("Signing Up failed", {
          isClosable: true,
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    }
  }

  return { register, isLoading };
}
