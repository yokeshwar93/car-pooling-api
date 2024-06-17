"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCarsSchema = void 0;
const zod_1 = require("zod");
const carsSchema = zod_1.z.object({
    id: zod_1.z.number(),
    seats: zod_1.z.number().min(1).max(6),
});
exports.createCarsSchema = zod_1.z.array(carsSchema);
//# sourceMappingURL=cars.schema.js.map