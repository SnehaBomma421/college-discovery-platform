"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (name: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("edu_discover_current_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (name: string, password: string) => {
    try {
      const storedUsersRaw = localStorage.getItem("edu_discover_users");
      const users = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];
      
      const foundUser = users.find(
        (u: any) => u.name.trim().toLowerCase() === name.trim().toLowerCase() && u.password === password
      );

      if (!foundUser) {
        return { success: false, error: "Invalid username or password." };
      }

      const sessionUser: User = { name: foundUser.name, email: foundUser.email };
      localStorage.setItem("edu_discover_current_user", JSON.stringify(sessionUser));
      setUser(sessionUser);
      return { success: true };
    } catch (e) {
      return { success: false, error: "An error occurred during login." };
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const storedUsersRaw = localStorage.getItem("edu_discover_users");
      const users = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];

      const nameExists = users.some(
        (u: any) => u.name.trim().toLowerCase() === name.trim().toLowerCase()
      );
      if (nameExists) {
        return { success: false, error: "Username is already taken." };
      }

      const emailExists = users.some(
        (u: any) => u.email.trim().toLowerCase() === email.trim().toLowerCase()
      );
      if (emailExists) {
        return { success: false, error: "Email is already registered." };
      }

      const newUser = { name, email, password };
      users.push(newUser);
      localStorage.setItem("edu_discover_users", JSON.stringify(users));

      return { success: true };
    } catch (e) {
      return { success: false, error: "An error occurred during signup." };
    }
  };

  const logout = () => {
    localStorage.removeItem("edu_discover_current_user");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
