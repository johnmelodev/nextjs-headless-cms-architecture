import { Campaign } from "./types";

export async function fetchCampaignBySlug(slug: string): Promise<Campaign | null> {
  const apiUrl = process.env.SITECORE_API_URL || "http://localhost:3000/api/cms";
  try {
    const res = await fetch(`${apiUrl}/campaigns/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Failed to fetch campaign with slug: ${slug}. Status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error(`Error in fetchCampaignBySlug for slug "${slug}":`, error);
    return null;
  }
}
