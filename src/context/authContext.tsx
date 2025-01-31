"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

type AuthContextType = {
  currentUser: User | null;
  logout: () => void;
  loading: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);

        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (userDoc.exists() && userDoc.data().role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          logout();
        }
      } else {
        setCurrentUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const logout = () => {
    auth.signOut().then(() => {
      setCurrentUser(null);
      setIsAdmin(false);
    });
  };

  const value = { currentUser, logout, loading, isAdmin };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// export const useAuth = () => useContext(AuthContext);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext must be used within an AuthContext");
  }
  return context;
}
