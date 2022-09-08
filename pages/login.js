import { useState, useRef, useEffect } from "react";
import { Input } from "../components/Input";
import { Card, CardTitle, CardDescription } from "../components/Card";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";

export default function Login({ disabled = true }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ username: "", password: "" });
  const [check, setCheck] = useState(disabled);
  const [hide, setHide] = useState(true);

  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError({ username: "", password: "" });

    const res = await fetch("http://127.0.0.1:6060/login", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (Object.values(data).includes("Login succeeded")) {
      router.back();
    } else if (Object.keys(data).includes("Errors")) {
      if (data["Errors"]["username"]) {
        setError((prev) => ({ ...prev, username: data["Errors"]["username"] }));
      }
      if (data["Errors"]["password"]) {
        setError((prev) => ({ ...prev, password: data["Errors"]["password"] }));
      }
    }
  };

  return (
    <Layout signup>
      <div className="h-full flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-10 right-10">
        <Card>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login now to access more analytics</CardDescription>
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
                onClick={() => setError({})}
                placeholder={error.password ? error.password : "Password"}
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
