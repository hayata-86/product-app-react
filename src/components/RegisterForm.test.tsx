import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import RegisterForm from "./RegisterForm";

describe("RegisterForm", () => {
  test("入力して登録ボタンを押すとregisterが呼ばれる", async () => {
    const user = userEvent.setup();

    const register = vi.fn();
    const onSwitchToLogin = vi.fn();

    render(
      <RegisterForm
        authErrorMessage=""
        register={register}
        onSwitchToLogin={onSwitchToLogin}
      />
    );

    await user.type(
      screen.getByPlaceholderText("ユーザー名"),
      "山田太郎"
    );

    await user.type(
      screen.getByPlaceholderText("メールアドレス"),
      "yamada@example.com"
    );

    await user.type(
      screen.getByPlaceholderText("パスワード"),
      "password123"
    );

    await user.click(
      screen.getByRole("button", {
        name: "登録する",
      })
    );

    expect(register).toHaveBeenCalledWith(
      "山田太郎",
      "yamada@example.com",
      "password123"
    );
  });

  test("ログイン画面へ戻るを押すとonSwitchToLoginが呼ばれる", async () => {
    const user = userEvent.setup();

    const register = vi.fn();
    const onSwitchToLogin = vi.fn();

    render(
      <RegisterForm
        authErrorMessage=""
        register={register}
        onSwitchToLogin={onSwitchToLogin}
      />
    );

    await user.click(
      screen.getByRole("button", {
        name: "ログイン画面へ戻る",
      })
    );

    expect(onSwitchToLogin).toHaveBeenCalledTimes(1);
  });
});