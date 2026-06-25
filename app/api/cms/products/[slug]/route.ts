import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const filePath = path.join(process.cwd(), "data/sitecore/products.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const products = JSON.parse(fileContent);

    const product = products.find((p: { slug: string }) => p.slug === slug);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error reading product by slug:", error);
    return NextResponse.json({ error: "Failed to load product details" }, { status: 500 });
  }
}
