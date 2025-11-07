import { ComponentProps } from "react";

function Menu(props: ComponentProps<"svg">) {
  return (
    <svg
      width="18"
      height="14"
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17 13L1 13M11.5 7L1 7M17 1L1 0.999998"
        stroke="#252526"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default Menu;
