import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";

import { useAuth } from "./useAuth";

describe("useAuth", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("正しいメールアドレスとパスワードでログインできる", () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      const success = result.current.login("test@example.com", "password");

      expect(success).toBe(true);
    });

    expect(result.current.isLoggedIn).toBe(true);
    expect(result.current.user?.email).toBe("test@example.com");
  });

  test("誤ったログイン情報ではログインできない", () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      const success = result.current.login("wrong@example.com", "wrong");

      expect(success).toBe(false);
    });

    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.authErrorMessage).toBe(
      "メールアドレスまたはパスワードが正しくありません"
    );
  });

  test("新規登録できる", () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      const success = result.current.register(
        "山田太郎",
        "yamada@example.com",
        "password123"
      );

      expect(success).toBe(true);
    });

    expect(result.current.isLoggedIn).toBe(true);
    expect(result.current.user?.name).toBe("山田太郎");
    expect(result.current.user?.email).toBe("yamada@example.com");
  });

  test("同じメールアドレスでは登録できない", () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.register("山田太郎", "yamada@example.com", "password123");
    });

    act(() => {
      const success = result.current.register(
        "佐藤花子",
        "yamada@example.com",
        "password456"
      );

      expect(success).toBe(false);
    });

    expect(result.current.authErrorMessage).toBe(
      "このメールアドレスはすでに登録されています"
    );
  });

  test("ログアウトできる", () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.login("test@example.com", "password");
    });

    expect(result.current.isLoggedIn).toBe(true);

    act(() => {
      result.current.logout();
    });

    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.user).toBeNull();
  });

  test("メールアドレスまたはパスワードが未入力の場合はログインできない", () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      const success = result.current.login("", "");

      expect(success).toBe(false);
    });

    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.authErrorMessage).toBe(
      "メールアドレスとパスワードを入力してください"
    );
  });

  test("新規登録時に未入力項目がある場合は登録できない", () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      const success = result.current.register("", "", "");

      expect(success).toBe(false);
    });

    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.authErrorMessage).toBe(
      "すべての項目を入力してください"
    );
  });

  test("メールアドレス形式が不正な場合は登録できない", () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      const success = result.current.register(
        "山田太郎",
        "invalid-email",
        "password123"
      );

      expect(success).toBe(false);
    });

    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.authErrorMessage).toBe(
      "メールアドレスの形式が正しくありません"
    );
  });

  test("パスワードが8文字未満の場合は登録できない", () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      const success = result.current.register(
        "山田太郎",
        "yamada@example.com",
        "pass"
      );

      expect(success).toBe(false);
    });

    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.authErrorMessage).toBe(
      "パスワードは8文字以上で入力してください"
    );
  });
});