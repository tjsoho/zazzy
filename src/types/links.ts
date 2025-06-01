/***************************************************************
                Types
***************************************************************/

export interface LinkData {
  id: string;
  title: string;
  url: string;
  imageUrl: string;
  type: "large" | "medium" | "extraLarge" | "small";
  order: number;
  isActive: boolean;
  clicks: number;
  clickHistory: { [date: string]: number };
}

export interface LinkProps {
  data: LinkData;
  className?: string;
}
