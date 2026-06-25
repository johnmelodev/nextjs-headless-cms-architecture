import { CMSPageResponse } from "./types";

export async function fetchHomePage(): Promise<CMSPageResponse | null> {
  const apiUrl = process.env.SITECORE_API_URL || "http://localhost:3000/api/cms";
  try {
    const res = await fetch(`${apiUrl}/home`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch home page. Status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error in fetchHomePage:", error);
    return null;
  }
}
