"use client";

import type { GoeyToasterProps } from "goey-toast";

import { GoeyToaster as GoeyToasterPrimitive, goeyToast } from "goey-toast";

import "goey-toast/styles.css";

export type {
  GoeyPromiseData,
  GoeyToastAction,
  GoeyToastClassNames,
  GoeyToastOptions,
  GoeyToastTimings,
} from "goey-toast";
export { goeyToast };
export type { GoeyToasterProps };

function GoeyToaster(props: GoeyToasterProps) {
  return <GoeyToasterPrimitive position="bottom-right" {...props} />;
}

export { GoeyToaster };
