import { Card, CardTitle } from "./Card";
import { useSubscription, gql } from "@apollo/client";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { Loader } from "../components/Loader";
import crypto from "crypto";
import { Status } from "../components/Status";
import { TipLink } from "../components/TipLink";

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");

const GET_Transactions = gql`
  subscription {
    transactions {
      TransactionID
      Time
      Sender
      Type
      Status
      Amount
      Function
    }
  }
`;

const printData = (data) => {
  if (data) {
    return data["transactions"].map((x) => {
      return (
        <div
          className="border border-gray-300 flex flex-row justify-between"
          key={crypto.randomBytes(20).toString("hex")}
        >
          <div className="flex flex-row w-2/3">
            <div className="flex items-center justify-center border border-gray-300 mr-3">
              {Status(x["Status"], 6)}
            </div>
            <div className="w-1/3 flex flex-col border border-gray-300 mr-3">
              <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                {x["TransactionID"]}
              </p>
              <p className="text-xs">
                {timeAgo.format(new Date(x["Time"]), "round")}
              </p>
            </div>
            <div className="w-full lg:w-1/2 flex flex-row items-center border border-gray-300">
              <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                Created by
              </p>
              <div className="w-3/4">
                <TipLink acc link={x["Sender"]} />
              </div>
            </div>
          </div>
          <div className="w-1/3 justify-end border border-gray-300 flex-col hidden lg:flex">
            <p className="text-right text-sm">{x["Type"]}</p>
            <p className="text-right">
              {x["Amount"] ? x["Amount"] : x["Function"] ? x["Function"] : null}
            </p>
          </div>
        </div>
      );
    });
  }
};

export const Transactions = () => {
  const { data } = useSubscription(GET_Transactions);

  return (
    <Card>
      <CardTitle>Latest Transactions</CardTitle>
      <hr className="text-black bg-black h-[0.1em]" />
      {data ? (
        printData(data)
      ) : (
        <div className="flex justify-center">
          <Loader />
        </div>
      )}
    </Card>
  );
};
