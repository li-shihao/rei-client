import { Card, CardTitle } from "./Card";
import { useSubscription, gql } from "@apollo/client";
import { Loader } from "../components/Loader";
import crypto from "crypto";

const GET_NFTs = gql`
  subscription {
    nfts {
      Type
      Count
    }
  }
`;

const printData = (data) => {
  if (data) {
    data["nfts"] = data["nfts"].slice(0, 10);
    if (data) {
      return data["nfts"].map((x) => {
        return (
          <div
            className="border border-gray-300 flex flex-row justify-between"
            key={crypto.randomBytes(20).toString("hex")}
          >
            <div className="w-1/3 border border-gray-300">
              <p className="border border-gray-300 whitespace-nowrap text-ellipsis overflow-hidden [direction:rtl] text-left">
                {x["Type"]}
              </p>
            </div>
            <div className="border border-gray-300">
              <p className="border border-gray-300">{x["Count"]} Tokens</p>
            </div>
          </div>
        );
      });
    }
  }
};

export const NFTs = () => {
  const { data } = useSubscription(GET_NFTs);

  return (
    <Card>
      <CardTitle>Hottest NFTs</CardTitle>
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
