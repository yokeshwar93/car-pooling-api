import { z } from "zod";
export declare const createCarsSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodNumber;
    seats: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id?: number;
    seats?: number;
}, {
    id?: number;
    seats?: number;
}>, "many">;
