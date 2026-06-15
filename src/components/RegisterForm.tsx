import React, { useState } from "react";

type RegisterFormProps = {
  authErrorMessage: string;
  register: (
    name: string,
    email: string,
    password: string
  ) => boolean;
  onSwitchToLogin: () => void;
};

function RegisterForm({
  authErrorMessage,
  register,
  onSwitchToLogin,
}: RegisterFormProps) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();

    register(name, email, password);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="title">新規登録</h1>

        {authErrorMessage && (
          <p className="error-message">{authErrorMessage}</p>
        )}

        <div className="form-row">
          <input
            className="text-input"
            type="text"
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setName(event.target.value)
            }
            placeholder="ユーザー名"
          />
        </div>

        <div className="form-row">
          <input
            className="text-input"
            type="email"
            value={email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(event.target.value)
            }
            placeholder="メールアドレス"
          />
        </div>

        <div className="form-row">
          <input
            className="text-input"
            type="password"
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(event.target.value)
            }
            placeholder="パスワード"
          />
        </div>

        <button className="primary-button" type="submit">
          登録する
        </button>

        <button
          className="secondary-button"
          type="button"
          onClick={onSwitchToLogin}
        >
          ログイン画面へ戻る
        </button>
      </form>
    </div>
  );
}

export default React.memo(RegisterForm);