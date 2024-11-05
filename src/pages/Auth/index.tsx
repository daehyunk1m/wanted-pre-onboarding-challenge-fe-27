import { produce } from "immer";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api";
import { useAuth } from "../../hooks/useAuth";

const Auth = () => {
  const initAuthState = {
    email: { value: "", isValidated: false },
    password: { value: "", isValidated: false },
  };

  const navigate = useNavigate();

  const [auth, setAuth] = useState(initAuthState);

  const handleAuthInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    const key = name as "email" | "password";
    setAuth((auth) =>
      produce(auth, (entry) => {
        entry[key].value = value;
      })
    );
  };

  /**
   * auth 정보 정합성 확인
   */
  const validatedtAuthValue = (userType: "login" | "signUp") => {
    const {} = auth;
    if (!auth.email.isValidated) {
      if (!auth.email.value.includes("@")) setErrMsg("올바른 이메일 형식을 입력해주세요.");
      else {
        const [, mail] = auth.email.value.split("@");

        if (!mail.includes(".")) setErrMsg("올바른 이메일 형식을 입력해주세요.");
        else {
          if (errMsg?.includes("이메일")) setErrMsg(null);

          setAuth((auth) =>
            produce(auth, (entry) => {
              entry[key].isValidated = true;
            })
          );
        }
      }
    }

    if (!auth.password.isValidated) {
    }

    if (key === "email") {
      // validated email value
      if (!auth.email.value.includes("@")) setErrMsg("올바른 이메일 형식을 입력해주세요.");
      else {
        const [, mail] = auth.email.value.split("@");

        if (!mail.includes(".")) setErrMsg("올바른 이메일 형식을 입력해주세요.");
        else {
          if (errMsg?.includes("이메일")) setErrMsg(null);

          setAuth((auth) =>
            produce(auth, (entry) => {
              entry[key].isValidated = true;
            })
          );
        }
      }
    } else {
      // validated password value
      const maxLength = 8;
      if (auth.password.value.length < maxLength) return false;
    }

    setAuth((auth) =>
      produce(auth, (entry) => {
        entry.email.value = "";
        entry.password.value = "";
      })
    );
  };

  const { setToken } = useAuth();
  const submitAuth = async () => {
    const { message, token } = await login({
      email: auth.email.value,
      password: auth.password.value,
    });

    // signUp;
    setToken(token);
    navigate("/");
  };

  const [errMsg, setErrMsg] = useState<string | null>(null);

  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    const { email, password } = auth;
    if (email.isValidated && password.isValidated) setIsCorrect(true);
    else setIsCorrect(false);
  }, [auth]);

  useEffect(() => {
    if (isCorrect) submitAuth();
  }, [isCorrect]);

  return (
    <div>
      <input type='text' name='email' defaultValue={auth.email.value} onChange={handleAuthInput} />
      <input type='text' name='password' defaultValue={auth.password.value} onChange={handleAuthInput} />
      <span>{errMsg}</span>
      <button type='submit' disabled={!isCorrect} style={{ border: isCorrect ? "" : "solid 1px red" }} onClick={() => validatedtAuthValue("signUp")}>
        회원가입
      </button>
      <button type='submit' disabled={!isCorrect} style={{ border: isCorrect ? "" : "solid 1px red" }} onClick={() => validatedtAuthValue("login")}>
        로그인
      </button>
    </div>
  );
};

export default Auth;
