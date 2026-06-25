import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const filePath = path.join(process.cwd(), "data/sitecore/campaigns.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const campaigns = JSON.parse(fileContent);

    const campaign = campaigns[slug];
    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    }

    return NextResponse.json(campaign);
  } catch (error) {
    console.error("Error reading campaign by slug:", error);
    return NextResponse.json({ error: "Failed to load campaign data" }, { status: 500 });
  }
}
