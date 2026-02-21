import { ActionError } from "@/lib/safe-action";

export function takeFirstOrNull<TData>(data: TData[]) {
  return data[0] ?? null;
}

export function takeFirstOrThrow<TData>(data: TData[], errorMessage?: string) {
  const first = takeFirstOrNull(data);

  if (!first) {
    throw new ActionError(errorMessage ?? "Item not found");
  }

  return first;
}
