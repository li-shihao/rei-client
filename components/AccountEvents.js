import { Card, CardTitle } from "./Card";

export const AccountEvents = (props) => {
  const printEvents = (data, id) => {
    return data.map((x) => {
      return (
        <div className="border border-gray-300 flex flex-row gap-2">
          <p>
            {x["Type"] == "mint"
              ? "Minted"
              : x["Type"] == "burn"
              ? "Burnt"
              : x["Sender"] == id
              ? "Sent"
              : "Received"}
          </p>
          <p>{x["ObjectID"]}</p>
          <p>{x["TransactionID"]}</p>
          <p>{id}</p>
        </div>
      );
    });
  };

  return (
    <Card wide>
      <CardTitle>Events</CardTitle>
      {printEvents(
        props.data["accountHistory"]["Events"],
        props.data["accountHistory"]["AccountID"]
      )}
    </Card>
  );
};
