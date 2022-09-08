import { useState } from "react";
import { Input } from "../components/Input";
import { Card, CardDescription, CardTitle } from "../components/Card";
import { Layout } from "../components/Layout";
import { useRouter } from "next/router";

export default function Signup({ disabled = true }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [error, setError] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    secret: "",
  });
  const [check, setCheck] = useState(disabled);
  const [hide, setHide] = useState(true);

  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError({ username: "", password: "", confirmPassword: "", secret: "" });

    const res = await fetch("http://127.0.0.1:6060/signup", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ username, password, confirmPassword, secret }),
    });

    const data = await res.json();
    if (Object.values(data).includes("Signup succeeded")) {
      router.push("/");
    } else if (Object.keys(data).includes("Errors")) {
      if (data["Errors"]["username"]) {
        setError((prev) => ({ ...prev, username: data["Errors"]["username"] }));
      }
      if (data["Errors"]["password"]) {
        setError((prev) => ({ ...prev, password: data["Errors"]["password"] }));
      }
      if (data["Errors"]["confirmPassword"]) {
        setError((prev) => ({
          ...prev,
          confirmPassword: data["Errors"]["confirmPassword"],
        }));
      }
      if (data["Errors"]["secret"]) {
        setError((prev) => ({ ...prev, secret: data["Errors"]["secret"] }));
      }
    }
  };

  return (
    <Layout login>
      <div className="h-full flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-10 right-10">
        <Card>
          <CardTitle>Signup</CardTitle>
          <CardDescription>Signup now to access more analytics</CardDescription>
          <form onSubmit={onSubmit}>
            <label className="relative">
              <Input
                type="text"
                className={
                  error.username
                    ? "border-red-500 transition-colors placeholder:text-red-500"
                    : "border-black transition-colors"
                }
                placeholder={error.username ? error.username : "Username"}
                onClick={() => setError({})}
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              ></Input>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 absolute top-1/2 -translate-y-1/2 left-0 ml-2 border border-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </label>
            <label className="relative">
              <Input
                type={hide ? "password" : "text"}
                className={
                  error.password
                    ? "border-red-500 transition-colors placeholder:text-red-500"
                    : "border-black transition-colors"
                }
                placeholder={error.password ? error.password : "Password"}
                onClick={() => setError({})}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Input>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 absolute top-1/2 -translate-y-1/2 left-0 ml-2 border border-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                />
              </svg>
              <p
                className="absolute top-1/2 -translate-y-1/2 right-0 mr-2 border border-gray-300"
                onClick={() => setHide(!hide)}
              >
                {hide ? "Show" : "Hide"}
              </p>
            </label>
            <label className="relative">
              <Input
                type={hide ? "password" : "text"}
                className={
                  error.confirmPassword
                    ? "border-red-500 transition-colors placeholder:text-red-500"
                    : "border-black transition-colors"
                }
                placeholder={
                  error.confirmPassword
                    ? error.confirmPassword
                    : "Confirm Password"
                }
                onClick={() => setError({})}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Input>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 absolute top-1/2 -translate-y-1/2 left-0 ml-2 border border-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              <p
                className="absolute top-1/2 -translate-y-1/2 right-0 mr-2 border border-gray-300"
                onClick={() => setHide(!hide)}
              >
                {hide ? "Show" : "Hide"}
              </p>
            </label>
            <label className="relative">
              <Input
                type="text"
                className={
                  error.secret
                    ? "border-red-500 transition-colors placeholder:text-red-500"
                    : "border-black transition-colors"
                }
                placeholder={error.secret ? error.secret : "Secret"}
                onClick={() => setError({})}
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
              ></Input>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 absolute top-1/2 -translate-y-1/2 left-0 ml-2 border border-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"
                />
              </svg>
            </label>
            <label className="flex flex-row items-center border border-gray-300 my-2">
              <input
                className="mx-2 accent-black"
                type="checkbox"
                onChange={() => setCheck(!check)}
              ></input>
              <p>I agree to the terms and conditions</p>
            </label>
            <Input
              className="hover:enabled:bg-black hover:enabled:text-white hover:enabled:-translate-y-1 transition-all hover:enabled:cursor-pointer"
              type="submit"
              disabled={check}
            ></Input>
          </form>
        </Card>
      </div>
    </Layout>
  );
}
