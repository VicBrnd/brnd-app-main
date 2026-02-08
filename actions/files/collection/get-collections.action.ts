"use server";

import { getCollections } from "@/lib/data/collections/get-collections";
import { authActionClient } from "@/lib/safe-action";

export const getCollectionsAction = authActionClient
  .metadata({ actionName: "getCollections" })
  .action(async () => {
    return await getCollections();
  });
