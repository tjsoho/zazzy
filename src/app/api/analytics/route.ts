/***************************************************************
                NOTES
***************************************************************/
/*
- API route for managing analytics
- Handles click tracking and statistics
- Uses TypeScript
- Implements proper error handling
- Follows RESTful conventions
*/

/***************************************************************
                IMPORTS
***************************************************************/
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { LinkData } from "@/types/links";

/***************************************************************
                Types
***************************************************************/
interface LinksData {
  links: LinkData[];
}

interface AnalyticsResponse {
  id: string;
  clicks: number;
  clickHistory: { [date: string]: number };
}

/***************************************************************
                Constants
***************************************************************/
const dataFilePath = path.join(process.cwd(), "src/data/links.json");

/***************************************************************
                Functions
***************************************************************/
async function readLinksFile(): Promise<LinksData> {
  try {
    const fileContents = await fs.readFile(dataFilePath, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading links file:", error);
    return { links: [] };
  }
}

async function writeLinksFile(data: LinksData): Promise<boolean> {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error("Error writing links file:", error);
    return false;
  }
}

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

/***************************************************************
                API Routes
***************************************************************/
// GET /api/analytics
export async function GET() {
  try {
    const data = await readLinksFile();
    const analytics = data.links.map((link) => ({
      id: link.id,
      clicks: link.clicks,
      clickHistory: link.clickHistory,
    }));
    return NextResponse.json(analytics);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}

// POST /api/analytics/track
export async function POST(request: Request) {
  try {
    const { linkId } = await request.json();
    const data = await readLinksFile();

    const link = data.links.find((link: LinkData) => link.id === linkId);
    if (!link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    // Update click count and history
    const today = getToday();
    link.clicks = (link.clicks || 0) + 1;
    link.clickHistory = link.clickHistory || {};
    link.clickHistory[today] = (link.clickHistory[today] || 0) + 1;

    await writeLinksFile(data);

    const response: AnalyticsResponse = {
      id: link.id,
      clicks: link.clicks,
      clickHistory: link.clickHistory,
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { error: "Failed to track click" },
      { status: 500 }
    );
  }
}
