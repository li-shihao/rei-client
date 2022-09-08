import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import { Card } from "../../components/Card";
import { Loader } from "../../components/Loader";
import { useQuery, gql } from "@apollo/client";
import { useState, useEffect } from "react";
import { AccountObject } from "../../components/AccountObject";
import { AccountTransaction } from "../../components/AccountTransaction";
import { Tab } from "../../components/Tab";
import { AccountEvents } from "../../components/AccountEvents";

const GET_ACCOUNT = gql`
  query ($AccountID: String!) {
    accountHistory(AccountID: $AccountID) {
      AccountID
      Balance
      Transactions {
        Status
        Type
        TransactionID
        Sender
        Recipient
        Time
        Amount
        Package
        Module
        Function
        Gas
      }
      Objects {
        ObjectId
        Type
        Metadata
      }
      Events {
        Type
        ObjectID
        Sender
        TransactionID
      }
    }
  }
`;

const Post = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [right, setRight] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const { loading, data, error } = useQuery(GET_ACCOUNT, {
    variables: { AccountID: id },
    onError: () => {
      console.log(error);
    },
  });

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

  return loggedIn && data ? (
    <Layout logout>
      <Card wide>
        <div className="flex flex-row gap-5">
          <div className="grid place-items-center border border-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </div>
          <div className="flex flex-col border border-gray-300 overflow-hidden">
            <h1 className="text-2xl border border-gray-300">Account</h1>
            <div className="flex flex-row gap-2 items-center">
              <p className="text-ellipsis overflow-hidden whitespace-nowrap border border-gray-300 ">
                {id}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 border border-gray-300 hover:cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(id);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
                />
              </svg>
            </div>
          </div>
        </div>
      </Card>
      <Card wide>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <h2>Net Worth in SUI</h2>
            <p className="text-3xl">
              TBD
              <span className="text-xl"> SUI</span>
            </p>
          </div>
          <div className="bg-black text-white rounded-lg px-4 py-2 flex flex-col justify-center items-center">
            <h3>SUI Balance</h3>
            <p>{data["accountHistory"]["Balance"]}</p>
          </div>
        </div>
      </Card>
      <Tab list={["Objects", "Transactions", "Events"]}>
        <AccountObject data={data} />
        <AccountTransaction data={data} />
        <AccountEvents data={data} />
      </Tab>
    </Layout>
  ) : (
    <div className="w-screen h-screen grid place-items-center">
      <Loader />
    </div>
  );
};

export default Post;
