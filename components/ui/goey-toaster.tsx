"use client";

import type { GoeyToasterProps } from "goey-toast";

import { GoeyToaster as GoeyToasterPrimitive } from "goey-toast";

import "goey-toast/styles.css";

function GoeyToaster(props: GoeyToasterProps) {
  return <GoeyToasterPrimitive position="bottom-right" {...props} />;
}

export { GoeyToaster };
