import { Button } from "./BasicButton";
import { useRouter } from "next/router";

export const Layout = (props) => {
  const router = useRouter();

  const logout = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:6060/logout", {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    if (Object.values(data).includes("Logout successful")) {
      router.push("/login");
    }
  };

  return (
    <div className="font-SKConcretica px-10 pt-4 pb-40">
      <div className="flex justify-between flex-row border border-gray-300 w-full z-10 relative">
        <div className="grid place-items-center border border-gray-300 text-2xl">
          <a href="/">
            <h2 className="tracking-widest hover:-translate-y-1 transition-all">
              REI.IO
            </h2>
          </a>
        </div>
        <div>
          {props.logout && (
            <Button
              className=" hover:bg-black hover:text-white hover:-translate-y-1 transition-all"
              onClick={(e) => logout(e)}
            >
              Logout
            </Button>
          )}
          {props.login && (
            <Button
              className=" hover:bg-black hover:text-white hover:-translate-y-1 transition-all"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
          )}
          {props.signup && (
            <Button
              className=" hover:bg-black hover:text-white hover:-translate-y-1 transition-all"
              onClick={() => router.push("/signup")}
            >
              Signup
            </Button>
          )}
        </div>
      </div>
      <div className="z-0">{props.children}</div>
    </div>
  );
};
