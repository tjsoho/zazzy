/***************************************************************
                NOTES
***************************************************************/
/*
- Types for links context
- Defines context interface
- Uses TypeScript
*/

/***************************************************************
                IMPORTS
***************************************************************/
import { LinkData } from "./links";

/***************************************************************
                Types
***************************************************************/
export interface LinksContextType {
  links: LinkData[];
  isLoading: boolean;
  updateLinks: (newLinks: LinkData[]) => Promise<void>;
  updateLink: (updatedLink: LinkData) => Promise<void>;
  deleteLink: (linkId: string) => Promise<void>;
  trackClick: (linkId: string) => Promise<void>;
}
