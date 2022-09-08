import { Fragment, useRef, useState } from "react";
import { Transition } from "react-transition-group";

const accordionStyles = {
  entering: "-mt-2 mb-6 max-h-[100rem]",
  entered: "-mt-2 mb-6 max-h-[100rem]",
  exited: "overflow-hidden -mt-10 mb-5 max-h-0",
  exiting: "overflow-hidden -mt-10 mb-5 max-h-0",
};

const svgStyles = {
  entering: "rotate-180",
  entered: "rotate-180",
  exiting: "",
  exited: "",
};

export const Accordion = (props) => {
  const [open, setOpen] = useState(false);
  const nodeRef = useRef(null);

  return (
    <Fragment>
      <div className="flex flex-col border border-black rounded-lg z-10 bg-white">
        {props.children}
        <div
          className="grid place-items-center py-2 rounded-b-lg hover:bg-black hover:cursor-pointer transition-colors hover:text-white"
          onClick={(e) => {
            e.preventDefault;
            setOpen(!open);
          }}
        >
          <Transition in={open} timeout={300} nodeRef={nodeRef}>
            {(state) => (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-6 h-6 transition-all ${svgStyles[state]}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            )}
          </Transition>
        </div>
      </div>
      <Transition in={open} timeout={300} nodeRef={nodeRef}>
        {(state) => {
          return (
            <div
              ref={nodeRef}
              className={`transition-all  rounded-b-lg p-4 z-0 border border-black ${accordionStyles[state]}`}
            >
              {props.printFunc}
            </div>
          );
        }}
      </Transition>
    </Fragment>
  );
};
