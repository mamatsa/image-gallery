import { z } from "zod";

export const StatisticsSchema = z.object({
  id: z.string(),
  downloads: z.object({
    total: z.number(),
  }),
  views: z.object({
    total: z.number(),
  }),
  likes: z.object({
    total: z.number(),
  }),
});

export type Statistics = z.infer<typeof StatisticsSchema>;
