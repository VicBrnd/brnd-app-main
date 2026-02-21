"use client";

import useSWR from "swr";

import { api } from "@/lib/data/api";

export const dataClient = {
  useCollections() {
    const { data, isLoading, error, mutate } = useSWR(
      "collections",
      async () => {
        const { data, error } = await api.collections.get();
        if (error) throw error;
        return data!;
      },
      { revalidateOnFocus: false },
    );

    return { data, isPending: isLoading, error, refetch: () => mutate() };
  },

  useDocuments(collectionId?: string) {
    const { data, isLoading, error, mutate } = useSWR(
      ["documents", collectionId] as const,
      async ([, id]) => {
        const { data, error } = await api.documents.get({
          query: { collectionId: id },
        });
        if (error) throw error;
        return data!;
      },
      { revalidateOnFocus: false },
    );

    return { data, isPending: isLoading, error, refetch: () => mutate() };
  },
};
