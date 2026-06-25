import { Product } from "./types";

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const apiUrl = process.env.SITECORE_API_URL || "http://localhost:3000/api/cms";
  try {
    const res = await fetch(`${apiUrl}/products/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Failed to fetch product with slug: ${slug}. Status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error(`Error in fetchProductBySlug for slug "${slug}":`, error);
    return null;
  }
}
