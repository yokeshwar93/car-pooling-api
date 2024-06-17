"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropoffDTO = exports.LocateDTO = exports.JourneyDTO = void 0;
const openapi = require("@nestjs/swagger");
class JourneyDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, people: { required: true, type: () => Number } };
    }
}
exports.JourneyDTO = JourneyDTO;
class LocateDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { ID: { required: true, type: () => Number } };
    }
}
exports.LocateDTO = LocateDTO;
class DropoffDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { ID: { required: true, type: () => Number } };
    }
}
exports.DropoffDTO = DropoffDTO;
//# sourceMappingURL=journey.dto.js.map