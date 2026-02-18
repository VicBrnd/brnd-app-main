"use client";

import { useCallback, useRef } from "react";

/**
 * Don't use this, could be deleted anytime.
 *
 * @internal
 */
export function useEffectEvent<F extends (...params: never[]) => unknown>(
  callback: F,
): F {
  const ref = useRef(callback);
  ref.current = callback;

  // eslint-disable-next-line react-hooks/use-memo -- stable ref-based event handler
  return useCallback(((...params) => ref.current(...params)) as F, []);
}
