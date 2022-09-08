import { Card, CardDescription, CardTitle } from "../components/Card";
import { useSubscription, gql } from "@apollo/client";
import { useEffect, useRef } from "react";
import CountUp from "react-countup";

const GET_TPS = gql`
  subscription {
    TPS
  }
`;

export const TPS = () => {
  const { data } = useSubscription(GET_TPS);
  const arr = useRef([]);

  useEffect(() => {
    if (data) {
      if (arr.current.length > 1) {
        arr.current.shift();
      }
      arr.current.push(data["TPS"]);
    }
  }, [data]);

  return (
    <Card>
      <CardTitle>TPS</CardTitle>
      <CardDescription>Real time SUI TPS</CardDescription>
      <CountUp
        className="text-7xl"
        decimals={2}
        start={arr.current.length == 0 ? 0 : arr.current[0]}
        duration={1}
        end={data ? data["TPS"] : 0}
      />
    </Card>
  );
};
