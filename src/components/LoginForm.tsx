import React, { useState } from "react";

type LoginFormProps = {
  authErrorMessage: string;
  login: (
    email: string,
    password: string
  ) => boolean;
  onSwitchToRegister: () => void;
};

function LoginForm({
  authErrorMessage,
  login,
  onSwitchToRegister,
}: LoginFormProps) {
  const [email, setEmail] =
    useState<string>("");

  const [password, setPassword] =
    useState<string>("");

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();

    login(email, password);
  };

  return (
    <div className="login-container">
      <form
        className="login-form"
        onSubmit={handleSubmit}
      >
        <h1 className="title">ログイン</h1>

        {authErrorMessage && (
          <p className="error-message">
            {authErrorMessage}
          </p>
        )}

        <div className="form-row">
          <input
            className="text-input"
            type="email"
            value={email}
            onChange={(
              event: React.ChangeEvent<HTMLInputElement>
            ) => setEmail(event.target.value)}
            placeholder="メールアドレス"
          />
        </div>

        <div className="form-row">
          <input
            className="text-input"
            type="password"
            value={password}
            onChange={(
              event: React.ChangeEvent<HTMLInputElement>
            ) =>
              setPassword(event.target.value)
            }
            placeholder="パスワード"
          />
        </div>

        <button
          className="primary-button"
          type="submit"
        >
          ログイン
        </button>

        <button
          className="secondary-button"
          type="button"
          onClick={onSwitchToRegister}
        >
          新規登録はこちら
        </button>

        <p className="login-help">
          テスト用:
          test@example.com / password
        </p>
      </form>
    </div>
  );
}

export default React.memo(LoginForm);