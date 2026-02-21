import { useCallback } from "react";

import { usePathname } from "next/navigation";

import { normalizePath } from "@/lib/utils";

type NavNode = { url?: string; items?: NavNode[] | null };

function isPathPartOf(pathname: string, url: string): boolean {
  const normalizedUrl = normalizePath(url);
  if (normalizedUrl === "/") return pathname === "/";
  return pathname === normalizedUrl || pathname.startsWith(`${normalizedUrl}/`);
}

function checkSubItems(subItems: NavNode[], pathname: string): boolean {
  return subItems.some((item) => {
    if (item.url) return isPathPartOf(pathname, item.url);
    if (item.items?.length) return checkSubItems(item.items, pathname);
    return false;
  });
}

export const useActive = () => {
  const pathname = normalizePath(usePathname());

  const isActive = useCallback(
    (url: string): boolean => {
      if (!url) return false;
      return pathname === normalizePath(url);
    },
    [pathname],
  );

  const isPartOf = useCallback(
    (url: string): boolean => {
      if (!url) return false;
      return isPathPartOf(pathname, url);
    },
    [pathname],
  );

  const isDefaultOpen = useCallback(
    (subItems?: NavNode[] | null): boolean => {
      if (!subItems?.length) return false;
      return checkSubItems(subItems, pathname);
    },
    [pathname],
  );

  return { isActive, isPartOf, isDefaultOpen };
};
