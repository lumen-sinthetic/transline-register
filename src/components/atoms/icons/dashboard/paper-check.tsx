import { ComponentProps } from "react";

function PaperCheck(props: ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.15 15.15H2.54999C1.55588 15.15 0.749994 14.3441 0.75 13.3499L0.75007 2.54999C0.750076 1.55588 1.55596 0.75 2.55007 0.75H10.6503C11.6444 0.75 12.4503 1.55589 12.4503 2.55V7.5M8.85028 12.6L10.5003 14.25L14.7003 9.75"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
      />
    </svg>
  );
}

export default PaperCheck;
