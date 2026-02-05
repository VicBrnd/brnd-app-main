import { redirect } from "next/navigation";

import { getSession } from "@/lib/data/account/get-session";

export async function getAuthContext() {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  return {
    user: session.user,
    session: session.session,
  };
}
