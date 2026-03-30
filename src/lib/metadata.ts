import type { Metadata } from "next";

export const SITE_URL = "https://bizarrelineage.com";

function normalizePath(pathname: string) {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

export function withCanonical(metadata: Metadata, pathname: string): Metadata {
  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      canonical: normalizePath(pathname),
    },
  };
}
