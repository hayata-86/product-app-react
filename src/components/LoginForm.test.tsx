import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  test("メールアドレスとパスワードを入力してログインボタンを押すとloginが呼ばれる", async () => {
    const user = userEvent.setup();

    const login = vi.fn();
    const onSwitchToRegister = vi.fn();

    render(
      <LoginForm
        authErrorMessage=""
        login={login}
        onSwitchToRegister={onSwitchToRegister}
      />
    );

    await user.type(
      screen.getByPlaceholderText("メールアドレス"),
      "test@example.com"
    );

    await user.type(
      screen.getByPlaceholderText("パスワード"),
      "password"
    );

    await user.click(
      screen.getByRole("button", {
        name: "ログイン",
      })
    );

    expect(login).toHaveBeenCalledWith("test@example.com", "password");
  });

  test("新規登録はこちらをクリックするとonSwitchToRegisterが呼ばれる", async () => {
    const user = userEvent.setup();

    const login = vi.fn();
    const onSwitchToRegister = vi.fn();

    render(
      <LoginForm
        authErrorMessage=""
        login={login}
        onSwitchToRegister={onSwitchToRegister}
      />
    );

    await user.click(
      screen.getByRole("button", {
        name: "新規登録はこちら",
      })
    );

    expect(onSwitchToRegister).toHaveBeenCalledTimes(1);
  });
});