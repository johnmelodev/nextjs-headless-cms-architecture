import { Product } from "./types";

export async function fetchProducts(): Promise<Product[]> {
  const apiUrl = process.env.SITECORE_API_URL || "http://localhost:3000/api/cms";
  try {
    const res = await fetch(`${apiUrl}/products`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch products. Status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error in fetchProducts:", error);
    return [];
  }
}
