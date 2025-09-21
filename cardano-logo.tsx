import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

const CardanoLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 112 128"
    fill="none"
    className={cn("text-foreground", props.className)}
    {...props}
  >
    <path
      fill="currentColor"
      d="M89.39 128-56.1 40.54 22.99 128h-23L56.15 0 112.3 128H89.38Z"
      opacity={0.3}
    />
    <path
      fill="currentColor"
      d="m65.75 105.99-9.66-29.3-9.65 29.3h-13.6L56.15 64l23.3 41.99h-13.7Z"
    />
    <path
      fill="currentColor"
      d="M36.85 105.99 23.26 83.3l-11.63 22.69h-13L32.12 64l-23.5 41.99h13.6l11.64-22.7 11.63 22.7h13Z"
      opacity={0.5}
    />
    <path
      fill="currentColor"
      d="M75.35 105.99h13.6L65.65 64l23.3-41.99h-13.6l-11.63 22.7-11.64-22.7h-13.6l23.5 41.99-23.5 41.99h13.6l11.63-22.7Z"
      opacity={0.5}
    />
  </svg>
);
export default CardanoLogo;
