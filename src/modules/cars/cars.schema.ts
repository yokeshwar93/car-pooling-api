import { z } from "zod";

const carsSchema = z.object({
  id: z.number(),
  seats: z.number().min(1).max(6),
});

export const createCarsSchema = z.array(carsSchema);
