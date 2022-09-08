import { Children, useState } from "react";

export const Tab = (props) => {
  const [open, setOpen] = useState(0);

  return (
    <div className="flex flex-col mt-4">
      <div className="flex flex-row border gap-10 border-gray-300 justify-center">
        {props.list.map((x, i) => {
          return (
            <div
              className={`py-2 px-4 border rounded-md border-black hover:bg-black hover:-translate-y-1 hover:text-white hover:cursor-pointer transition-all ${
                i == open ? "bg-black text-white" : null
              }`}
              onClick={() => setOpen(i)}
            >
              <p>{x}</p>
            </div>
          );
        })}
      </div>
      {Children.map(props.children, (x, i) => {
        return i == open ? x : null;
      })}
    </div>
  );
};
