"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarsRequestDTO = void 0;
const openapi = require("@nestjs/swagger");
class CarsRequestDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, seats: { required: true, type: () => Number } };
    }
}
exports.CarsRequestDTO = CarsRequestDTO;
//# sourceMappingURL=cars.dto.js.map