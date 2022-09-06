import { TPS } from "../components/TPS";
import { Transactions } from "../components/Transactions";
import { NFTs } from "../components/NFTs";
import { Accounts } from "../components/Accounts";
import { Layout } from "../components/Layout";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Loader } from "../components/Loader";
import { Banner } from "../components/Banner";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchAuth() {
      const res = await fetch("http://127.0.0.1:6060/auth", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();
      if (Object.values(data).includes("Authenticated")) {
        setLoggedIn(true);
      } else {
        router.push("/login");
      }
    }
    fetchAuth();
  }, []);

  return loggedIn ? (
    <>
      <Layout logout>
        <Banner />
        <TPS />
        <Transactions />
        <NFTs />
        <Accounts />
      </Layout>
    </>
  ) : (
    <div className="w-screen h-screen grid place-items-center">
      <Loader />
    </div>
  );
}
