import { Card, CardTitle } from "./Card";
import { useSubscription, gql } from "@apollo/client";
import { Loader } from "../components/Loader";
import crypto from "crypto";

const GET_Accounts = gql`
  subscription {
    accounts {
      AccountID
      Balance
    }
  }
`;

const printData = (data) => {
  if (data) {
    if (data) {
      return data["accounts"].map((x) => {
        return (
          <div
            className="border border-gray-300 flex flex-row justify-between"
            key={crypto.randomBytes(20).toString("hex")}
          >
            <div className="w-1/3 border border-gray-300">
              <p className="border border-gray-300 whitespace-nowrap text-ellipsis overflow-hidden [direction:rtl] text-left">
                {x["AccountID"]}
              </p>
            </div>
            <div className="border border-gray-300">
              <p className="border border-gray-300">{x["Balance"]} SUI</p>
            </div>
          </div>
        );
      });
    }
  }
};

export const Accounts = () => {
  const { data } = useSubscription(GET_Accounts);

  return (
    <Card>
      <CardTitle>Biggest SUI Holders</CardTitle>
      <hr className="text-black bg-black h-[0.1em]" />
      {data ? (
        printData(data)
      ) : (
        <div className="w-full grid place-items-center">
          <Loader />
        </div>
      )}
    </Card>
  );
};
