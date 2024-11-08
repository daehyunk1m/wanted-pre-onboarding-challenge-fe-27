import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { produce } from "immer";

import { login, signUp } from "../../api";
import { useAuthStore } from "../../hooks/useAuthStore";

const Auth = () => {
  const navigate = useNavigate();
  const { setToken } = useAuthStore();

  const [auth, setAuth] = useState({
    email: { value: "", isValidated: false },
    password: { value: "", isValidated: false },
  });
  const [errorState, setErrorState] = useState({
    email: { isError: false, message: "" },
    password: { isError: false, message: "" },
  });

  /**
   * auth validation
   */
  const validationAuthValue = (type: "email" | "password", value: string) => {
    let validation: boolean;
    let message = "";

    if (type === "email") {
      // validating email value
      if (!value.includes("@")) validation = false;
      else {
        const [, mail] = value.split("@");
        if (!mail.includes(".")) validation = false;
        else validation = true;
      }

      if (!validation) message = "올바른 이메일 형식을 입력해주세요.";
    } else {
      // validated password value
      const maxLength = 8;
      if (value.length < maxLength) validation = false;
      else validation = true;

      if (!validation) message = "비밀번호는 8자 이상이어야 합니다.";
    }

    if (validation) message = "";

    return { validation, message, value };
  };

  const submitAuth = async (userType: "login" | "signUp") => {
    const getTokenByAuth = userType === "login" ? login : signUp;
    const email = auth.email.value;
    const password = auth.password.value;

    const { message, token } = await getTokenByAuth({ email, password });

    console.log(message);

    localStorage.setItem("usr", JSON.stringify({ id: email, token, timestamp: Date.now() }));
    setToken(token);
    navigate("/");
  };

  const isCorrect = useMemo(
    () => !!auth.email.value && auth.email.isValidated && !!auth.password.value && auth.password.isValidated,
    [auth.email.isValidated, auth.email.value, auth.password.isValidated, auth.password.value]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <h4>회원가입 | 로그인</h4>
      {(["email", "password"] as const).map((name, index) => {
        const hasErrorState = auth[name].value !== "" && !auth[name].isValidated;
        return (
          <label key={index} htmlFor=''>
            <span>{name === "email" ? "이메일" : "패스워드"}</span>
            <input
              type='text'
              name={name}
              style={{ border: hasErrorState ? "solid 1px red" : "" }}
              onChange={(e) => {
                const { value, message, validation } = validationAuthValue(name, e.target.value);

                setErrorState((error) =>
                  produce(error, (entry) => {
                    entry[name].isError = !validation;
                    entry[name].message = message;
                  })
                );

                setAuth((auth) =>
                  produce(auth, (entry) => {
                    entry[name].value = value;
                    entry[name].isValidated = validation;
                  })
                );
              }}
            />
            {errorState[name].isError && <span>{errorState[name].message}</span>}
          </label>
        );
      })}
      <div>
        <button type='submit' disabled={!isCorrect} style={{ opacity: isCorrect ? 1 : 0.3 }} onClick={() => submitAuth("signUp")}>
          회원가입
        </button>
        <button type='submit' disabled={!isCorrect} style={{ opacity: isCorrect ? 1 : 0.3 }} onClick={() => submitAuth("login")}>
          로그인
        </button>
      </div>
    </div>
  );
};

export default Auth;
