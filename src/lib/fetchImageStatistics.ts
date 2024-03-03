import type { Statistics } from "@/models/Statistics";
import { StatisticsSchema } from "@/models/Statistics";

export default async function fetchImageStatistics(
  id: string,
): Promise<Statistics | undefined> {
  try {
    const res = await fetch(
      `https://api.unsplash.com/photos/${id}/statistics?client_id=${process.env.UNSPLASH_API_KEY}`,
    );

    if (!res.ok) throw new Error("Error while fetching statistics!");

    const result: Statistics = await res.json();

    // Parse data with Zod schema
    const parsedData = StatisticsSchema.parse(result);

    return parsedData;
  } catch (e) {
    if (e instanceof Error) console.log(e.stack);
  }
}
