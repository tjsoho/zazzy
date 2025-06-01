/***************************************************************
                NOTES
***************************************************************/
/*
- Analytics utility functions
- Handles click period calculations
- Uses TypeScript
*/

/***************************************************************
                TYPES
***************************************************************/
type Period = "day" | "week" | "month" | "quarter" | "year";

interface ClickHistory {
  [date: string]: number;
}

/***************************************************************
                FUNCTIONS
***************************************************************/
export const getPeriodClicks = (
  clickHistory: ClickHistory,
  period: Period
): number => {
  const now = new Date();
  const startDate = new Date();

  switch (period) {
    case "day":
      startDate.setHours(0, 0, 0, 0);
      break;
    case "week":
      startDate.setDate(now.getDate() - now.getDay());
      startDate.setHours(0, 0, 0, 0);
      break;
    case "month":
      startDate.setDate(1);
      startDate.setHours(0, 0, 0, 0);
      break;
    case "quarter":
      const quarter = Math.floor(now.getMonth() / 3);
      startDate.setMonth(quarter * 3);
      startDate.setDate(1);
      startDate.setHours(0, 0, 0, 0);
      break;
    case "year":
      startDate.setMonth(0, 1);
      startDate.setHours(0, 0, 0, 0);
      break;
  }

  return Object.entries(clickHistory).reduce((total, [date, clicks]) => {
    const clickDate = new Date(date);
    return clickDate >= startDate ? total + clicks : total;
  }, 0);
};
