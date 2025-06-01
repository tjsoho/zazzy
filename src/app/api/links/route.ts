/***************************************************************
                NOTES
***************************************************************/
/*
- API route for managing links
- Handles CRUD operations
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

/***************************************************************
                API Routes
***************************************************************/
// GET /api/links
export async function GET() {
  try {
    const data = await readLinksFile();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch links" },
      { status: 500 }
    );
  }
}

// POST /api/links
export async function POST(request: Request) {
  try {
    const newLink = await request.json();
    const data = await readLinksFile();

    // Generate a unique ID
    const id = `link-${Date.now()}`;
    const linkWithId = { ...newLink, id };

    data.links.push(linkWithId);
    await writeLinksFile(data);

    return NextResponse.json(linkWithId);
  } catch {
    return NextResponse.json(
      { error: "Failed to create link" },
      { status: 500 }
    );
  }
}

// PUT /api/links
export async function PUT(request: Request) {
  try {
    const updatedLink = await request.json();
    const data = await readLinksFile();

    const index = data.links.findIndex(
      (link: LinkData) => link.id === updatedLink.id
    );
    if (index === -1) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    data.links[index] = updatedLink;
    await writeLinksFile(data);

    return NextResponse.json(updatedLink);
  } catch {
    return NextResponse.json(
      { error: "Failed to update link" },
      { status: 500 }
    );
  }
}

// PATCH /api/links
export async function PATCH(request: Request) {
  try {
    const newLinks = (await request.json()) as LinkData[];
    const data = await readLinksFile();

    // Validate that all links exist
    const existingIds = new Set(data.links.map((link: LinkData) => link.id));
    const newIds = new Set(newLinks.map((link: LinkData) => link.id));

    for (const id of newIds) {
      if (!existingIds.has(id)) {
        return NextResponse.json(
          { error: `Link with id ${id} not found` },
          { status: 404 }
        );
      }
    }

    // Update all links
    data.links = newLinks;
    const success = await writeLinksFile(data);

    if (!success) {
      return NextResponse.json(
        { error: "Failed to write links file" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating links:", error);
    return NextResponse.json(
      { error: "Failed to update links" },
      { status: 500 }
    );
  }
}

// DELETE /api/links
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const data = await readLinksFile();

    const index = data.links.findIndex((link: LinkData) => link.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    data.links.splice(index, 1);
    await writeLinksFile(data);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete link" },
      { status: 500 }
    );
  }
}
