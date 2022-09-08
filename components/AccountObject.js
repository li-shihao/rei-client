import { Card, CardTitle } from "./Card";
import { Accordion } from "./Accordion";
import { TipLink } from "../components/TipLink";

export const AccountObject = (props) => {
  let map = {};
  const data = props.data;

  const printFunc = (x) => {
    return (
      <>
        <div className="border-b mb-2 border-black flex flex-row justify-between">
          <p>Object ID</p>
          {x.toLowerCase().includes("coin") ? <p>Balance</p> : <p>Name</p>}
        </div>
        {map[x]["instance"].map((x) => {
          const ObjectId = x[1];
          const Metadata = x[0];
          return (
            <div className="flex flex-row justify-between" key={ObjectId}>
              <div className="w-1/2 border border-gray">
                <p className="whitespace-nowrap text-ellipsis overflow-hidden [direction:rtl] text-left">
                  {ObjectId}
                </p>
              </div>
              <div className="w-1/2 border border-gray flex justify-end">
                <p className={Metadata["name"] ? "flex" : "hidden"}>
                  {Metadata["name"] ? Metadata["name"] : null}
                </p>
                <p className={Metadata["balance"] ? "flex" : "hidden"}>
                  {Metadata["balance"] ? Metadata["balance"] : null}
                </p>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  const printObjects = (data) => {
    data["accountHistory"]["Objects"].map((x) => {
      if (map[x["Type"]]) {
        map[x["Type"]]["count"]++;
        map[x["Type"]]["instance"].push([x["Metadata"], x["ObjectId"]]);
      } else
        map[x["Type"]] = {
          count: 1,
          instance: [[x["Metadata"], x["ObjectId"]]],
        };
    });

    return Object.keys(map).map((x, i) => {
      return (
        <Accordion printFunc={printFunc(x)} key={i}>
          <div className="flex flex-row justify-between items-center p-4">
            <div className="flex-col flex border border-gray-300 w-2/3">
              <p className="text-lg border border-gray-300">
                {x[x.length - 1] == ">"
                  ? x.substring(x.lastIndexOf(":") + 1, x.lastIndexOf(">"))
                  : x.substring(x.lastIndexOf(":") + 1, x.length)}
              </p>
              <TipLink link={x} />
            </div>
            <p>
              <span className="text-xl">{map[x]["count"]}</span> owned
            </p>
          </div>
        </Accordion>
      );
    });
  };
  return (
    <Card wide>
      <CardTitle>Objects</CardTitle>
      <div className="flex flex-col border border-gray-300">
        {printObjects(data)}
      </div>
    </Card>
  );
};
