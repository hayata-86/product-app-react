import { useEffect, useState } from "react";

import type { User } from "../types/User.ts";

type RegisteredUser = User & {
  password: string;
};

const TEST_USER: RegisteredUser = {
  id: "1",
  name: "テストユーザー",
  email: "test@example.com",
  password: "password",
};

const USERS_STORAGE_KEY = "product-app-users";
const LOGIN_USER_STORAGE_KEY = "product-app-login-user";

export function useAuth() {
  const [users, setUsers] = useState<RegisteredUser[]>(() => {
    const savedUsers = localStorage.getItem(USERS_STORAGE_KEY);

    if (!savedUsers) {
      return [TEST_USER];
    }

    try {
      return JSON.parse(savedUsers) as RegisteredUser[];
    } catch {
      return [TEST_USER];
    }
  });

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem(LOGIN_USER_STORAGE_KEY);

    if (!savedUser) {
      return null;
    }

    try {
      return JSON.parse(savedUser) as User;
    } catch {
      return null;
    }
  });

  const [authErrorMessage, setAuthErrorMessage] = useState<string>("");

  useEffect(() => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(LOGIN_USER_STORAGE_KEY, JSON.stringify(user));
      return;
    }

    localStorage.removeItem(LOGIN_USER_STORAGE_KEY);
  }, [user]);

  const login = (email: string, password: string): boolean => {
    setAuthErrorMessage("");

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (trimmedEmail === "" || trimmedPassword === "") {
      setAuthErrorMessage("メールアドレスとパスワードを入力してください");
      return false;
    }

    const foundUser = users.find(
      (registeredUser) =>
        registeredUser.email === trimmedEmail &&
        registeredUser.password === trimmedPassword
    );

    if (!foundUser) {
      setAuthErrorMessage("メールアドレスまたはパスワードが正しくありません");
      return false;
    }

    setUser({
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
    });

    return true;
  };

  const register = (
    name: string,
    email: string,
    password: string
  ): boolean => {
    setAuthErrorMessage("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (trimmedName === "" || trimmedEmail === "" || trimmedPassword === "") {
      setAuthErrorMessage("すべての項目を入力してください");
      return false;
    }

    if (!trimmedEmail.includes("@")) {
      setAuthErrorMessage("メールアドレスの形式が正しくありません");
      return false;
    }

    if (trimmedPassword.length < 8) {
      setAuthErrorMessage("パスワードは8文字以上で入力してください");
      return false;
    }

    const exists = users.some(
      (registeredUser) => registeredUser.email === trimmedEmail
    );

    if (exists) {
      setAuthErrorMessage("このメールアドレスはすでに登録されています");
      return false;
    }

  const newUser: RegisteredUser = {
    id: String(Date.now()),
    name: trimmedName,
    email: trimmedEmail,
    password: trimmedPassword,
  };

  setUsers((prevUsers) => [...prevUsers, newUser]);

  setUser({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
  });

  return true;
};

  const logout = (): void => {
    setUser(null);
    setAuthErrorMessage("");
  };

  return {
    user,
    isLoggedIn: user !== null,
    authErrorMessage,
    login,
    register,
    logout,
  };
}