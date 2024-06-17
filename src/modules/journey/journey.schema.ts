import { z } from "zod";

export const createJourneySchema = z.object({
  id: z.number(),
  people: z.number().min(1).max(6),
});

export const locateJourneySchema = z.object({
  ID: z.string(),
});

export const dropoffJourneySchema = z.object({
  ID: z.string(),
});
