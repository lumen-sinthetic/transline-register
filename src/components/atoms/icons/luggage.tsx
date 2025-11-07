import { ComponentProps } from "react";

function Luggage(props: ComponentProps<"svg">) {
  return (
    <svg
      width="29"
      height="24"
      viewBox="0 0 29 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.53906 6.0641V2.93803C9.53906 2.07479 10.2701 1.375 11.1719 1.375H16.8867C17.7885 1.375 18.5195 2.07479 18.5195 2.93803V6.0641M4.64062 21.6944H24.2344C26.0379 21.6944 27.5 20.2949 27.5 18.5684V9.19017C27.5 7.46369 26.0379 6.0641 24.2344 6.0641H4.64062C2.83707 6.0641 1.375 7.46369 1.375 9.19017V18.5684C1.375 20.2949 2.83707 21.6944 4.64062 21.6944Z"
        stroke="#05C0E6"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default Luggage;
