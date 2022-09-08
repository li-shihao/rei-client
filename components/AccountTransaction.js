import { Card, CardTitle } from "./Card";
import { Status } from "../components/Status";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { Accordion } from "../components/Accordion";
import { TipLink } from "../components/TipLink";
import { RightArrow } from "../components/RightArrow";

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");

const printFunc = (x, id) => {
  return (
    <div key={Math.random() + id} className="flex flex-col">
      <div className="flex flex-row items-center border border-gray-300 justify-between">
        <div className="border w-1/4 border-gray-300 text-center">
          {x["Sender"] == id ? (
            "This Account"
          ) : (
            <TipLink acc link={x["Sender"]} />
          )}
        </div>
        <RightArrow />

        <div className="border w-1/4 border-gray-300 text-center">
          {x["Amount"] ? (
            <p>{x["Amount"]} SUI</p>
          ) : x["Function"] ? (
            <p className="text-ellipsis overflow-hidden whitespace-nowrap">
              {x["Function"]}
            </p>
          ) : null}
        </div>
        <RightArrow />
        <div className="border w-1/4 border-gray-300 text-center">
          {x["Recipient"] ? (
            x["Recipient"] == id ? (
              "This Account"
            ) : (
              <TipLink acc link={x["Recipient"]} />
            )
          ) : null}
          {x["Package"] ? (
            x["Package"] == id ? (
              <>
                <p>This Account</p>
                {x["Module"]}
              </>
            ) : (
              <>
                <TipLink link={x["Package"]} />
                {x["Module"]}
              </>
            )
          ) : null}
        </div>
      </div>
      <div className="flex items-center flex-col">
        <p>Gas: {x["Gas"]} SUI</p>
      </div>
    </div>
  );
};

export const AccountTransaction = (props) => {
  const printTransactions = (data) => {
    return data.map((x, i) => {
      return (
        <Accordion
          printFunc={printFunc(x, props.data["accountHistory"]["AccountID"])}
          key={i}
        >
          <div className="flex flex-row gap-2 p-4 justify-between">
            <div className="flex flex-row">
              <div className="grid place-items-center border border-gray-300">
                <p>{Status(x["Status"], 8)}</p>
              </div>
              <div className="flex flex-col border border-gray-300 w-5/6">
                <TipLink link={x["TransactionID"]} />
                <div className="flex flex-row border border-gray-300 gap-1 text-sm">
                  <p>
                    {x["Time"]
                      .replace("T", ", ")
                      .substring(0, x["Time"].length - 9)}
                  </p>
                  <p>({timeAgo.format(new Date(x["Time"]), "round")})</p>
                </div>
              </div>
            </div>
            <div className="border border-gray-300 grid place-items-center">
              <p>{x["Type"]}</p>
            </div>
          </div>
        </Accordion>
      );
    });
  };
  return (
    <Card wide>
      <CardTitle>Transactions</CardTitle>
      <div className="flex flex-col border border-gray-300">
        {printTransactions(props.data["accountHistory"]["Transactions"])}
      </div>
    </Card>
  );
};
