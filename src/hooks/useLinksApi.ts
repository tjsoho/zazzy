/***************************************************************
                NOTES
***************************************************************/
/*
- Custom hook for link API operations
- Handles all API calls
- Uses TypeScript
- Implements proper error handling
*/

/***************************************************************
                IMPORTS
***************************************************************/
import { LinkData } from "@/types/links";

/***************************************************************
                Types
***************************************************************/
interface AnalyticsResponse {
  clicks: number;
  clickHistory: { [date: string]: number };
}

/***************************************************************
                Functions
***************************************************************/
export async function fetchLinks(): Promise<LinkData[]> {
  const response = await fetch("/api/links");
  if (!response.ok) throw new Error("Failed to fetch links");
  const data = await response.json();
  return data.links;
}

export async function updateLinksAPI(newLinks: LinkData[]): Promise<void> {
  const response = await fetch("/api/links", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newLinks),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update links");
  }
}

export async function updateLinkAPI(updatedLink: LinkData): Promise<void> {
  const response = await fetch("/api/links", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedLink),
  });
  if (!response.ok) throw new Error("Failed to update link");
}

export async function deleteLinkAPI(linkId: string): Promise<void> {
  const response = await fetch("/api/links", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: linkId }),
  });
  if (!response.ok) throw new Error("Failed to delete link");
}

export async function trackClickAPI(
  linkId: string
): Promise<AnalyticsResponse> {
  const response = await fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ linkId }),
  });
  if (!response.ok) throw new Error("Failed to track click");
  return response.json();
}
