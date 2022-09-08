import { useRouter } from "next/router";

export const TipLink = (props) => {
  const router = useRouter();

  return (
    <div
      className="border-gray-300 flex flex-row"
      onClick={
        props.acc
          ? () => {
              router.push(`/account/${encodeURIComponent(props.link)}`);
            }
          : null
      }
    >
      <p className="border whitespace-nowrap text-ellipsis overflow-hidden [direction:rtl] text-left border-gray-300">
        {props.link}
      </p>
      <div className="relative hover:cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="black"
          className="w-4 h-4 absolute -top-1 -left-[0.1rem] border border-gray-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
          />
        </svg>
      </div>
    </div>
  );
};
