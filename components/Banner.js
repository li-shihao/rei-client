import { Card } from "../components/Card";
import { useState } from "react";

export const Banner = () => {
  const [open, setOpen] = useState(true);

  const closeBanner = () => {
    setOpen(false);
  };

  return (
    <>
      {open && (
        <Card className="bg-black" wide>
          <div className="flex flex-row gap-10 justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-10 h-10 border flex-shrink-0 border-gray-300 hidden md:flex"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
              />
            </svg>
            <p className="text-white text-lg">
              The dashboard metrics is currently in Beta, please bear with us
              while we finalise the dashboard!
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-10 h-10 flex-shrink-0 bg-gray-800 rounded-lg hover:bg-gray-600 transition-colors hover:cursor-pointer border border-gray-300"
              onClick={() => closeBanner()}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </Card>
      )}
    </>
  );
};
