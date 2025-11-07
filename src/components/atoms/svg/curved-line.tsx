import { ComponentProps } from "react";

function CurvedLine(props: ComponentProps<"svg">) {
  return (
    <svg
      width="45"
      height="128"
      viewBox="0 0 45 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.26465 -18L37.0821 29.7627C44.5633 40.329 40.1866 55.1107 28.1587 59.9006L20.1658 63.0836C7.74064 68.0317 3.57919 83.5453 11.8598 94.0476L36.2646 125"
        stroke="#05C0E6"
        strokeWidth="8"
      />
    </svg>
  );
}

export default CurvedLine;
