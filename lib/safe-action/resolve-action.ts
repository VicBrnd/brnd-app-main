type ActionResult<T> =
  | {
      data?: T;
      serverError?: string;
      validationErrors?: any;
    }
  | undefined;

export async function resolveActionResult<T>(
  action: Promise<ActionResult<T>>,
): Promise<T> {
  const result = await action;

  if (result?.serverError) {
    throw new Error(result.serverError);
  }

  if (result?.validationErrors) {
    const errors = result.validationErrors;

    const firstError = Object.values(errors)
      .flatMap((v: any) => (Array.isArray(v) ? v : (v?._errors ?? [])))
      .find(Boolean);

    throw new Error((firstError as string) ?? "Validation failed");
  }

  if (result?.data) {
    return result.data;
  }

  throw new Error("Something went wrong");
}
