import { produce } from "immer";
import React, { useState } from "react";

const Auth = () => {
  const [auth, setAuth] = useState({
    email: { value: "", isValidated: false },
    password: { value: "", isValidated: false },
  });

  const updateAuth = setAuth((auth) =>
    produce(auth, (entry) => {
      // entry.email.value
    })
  );

  const handleAuthInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setAuth((auth) => ({ ...auth, [name]: value }));
  };

  /**
   * auth 정보 정합성 확인
   */
  const validatedtAuthValue = () => {
    // validated email value
    auth.email.includes("@");
    auth.email.includes(".");

    // validated password value
    if (auth.password.length < 8) return false;

    setAuth((auth) =>
      produce(auth, (entry) => {
        entry.email = "";
        entry.password = "";
      })
    );
  };

  const [isCorrect, setIsCorrect] = useState(false);

  return (
    <div>
      <input type='text' name='email' defaultValue={auth.email} onChange={handleAuthInput} />
      <input type='text' name='password' defaultValue={auth.password} onChange={handleAuthInput} />
      <button type='submit' disabled={!isCorrect}>
        회원가입
      </button>
      <button type='submit' disabled={!isCorrect}>
        로그인
      </button>
    </div>
  );
};

export default Auth;
