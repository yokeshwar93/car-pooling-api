"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropoffJourneySchema = exports.locateJourneySchema = exports.createJourneySchema = void 0;
const zod_1 = require("zod");
exports.createJourneySchema = zod_1.z.object({
    id: zod_1.z.number(),
    people: zod_1.z.number().min(1).max(6),
});
exports.locateJourneySchema = zod_1.z.object({
    ID: zod_1.z.string(),
});
exports.dropoffJourneySchema = zod_1.z.object({
    ID: zod_1.z.string(),
});
//# sourceMappingURL=journey.schema.js.map