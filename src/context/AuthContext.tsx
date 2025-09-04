import React, { createContext, useContext, useEffect, useState } from "react";

import {
  type User,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { ref, get } from "firebase/database";

import { auth, database } from "../config/firebase";

interface AdminUser {
  uid: string;
  email: string;
  role: "admin" | "moderator";
}

interface AuthContextType {
  user: User | null;
  adminUser: AdminUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAdminStatus = async (firebaseUser: User): Promise<void> => {
    try {
      const adminRef = ref(database, `admin/users/${firebaseUser.uid}`);
      const snapshot = await get(adminRef);
      if (snapshot.exists()) {
        const adminData = snapshot.val();
        setAdminUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email ?? "",
          role: (adminData.role as "admin" | "moderator") ?? "admin",
        });
      } else {
        setAdminUser(null);
      }
    } catch (error) {
      console.error("管理者ステータスの確認に失敗しました:", error);
      setAdminUser(null);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser !== null) {
        await checkAdminStatus(firebaseUser);
      } else {
        setAdminUser(null);
      }
      setLoading(false);
    });

    return (): void => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("ログインに失敗しました:", error);
      throw error;
    }
  };

  const handleSignOut = async (): Promise<void> => {
    try {
      await signOut(auth);
      setAdminUser(null);
    } catch (error) {
      console.error("ログアウトに失敗しました:", error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    adminUser,
    loading,
    signIn,
    signOut: handleSignOut,
    isAdmin: adminUser !== null && adminUser.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
