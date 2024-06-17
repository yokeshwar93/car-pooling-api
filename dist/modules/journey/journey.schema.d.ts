import { z } from "zod";
export declare const createJourneySchema: z.ZodObject<{
    id: z.ZodNumber;
    people: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id?: number;
    people?: number;
}, {
    id?: number;
    people?: number;
}>;
export declare const locateJourneySchema: z.ZodObject<{
    ID: z.ZodString;
}, "strip", z.ZodTypeAny, {
    ID?: string;
}, {
    ID?: string;
}>;
export declare const dropoffJourneySchema: z.ZodObject<{
    ID: z.ZodString;
}, "strip", z.ZodTypeAny, {
    ID?: string;
}, {
    ID?: string;
}>;
